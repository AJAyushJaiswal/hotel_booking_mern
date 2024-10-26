import {asyncHandler} from '../utils/asyncHandler.js';
import {isValidObjectId} from 'mongoose';
import {ApiError} from '../utils/ApiError.js';
import {validationResult} from 'express-validator';
import {Hotel} from '../models/hotel.model.js';
import {Room} from '../models/room.model.js';
import {deleteFromCloudinary, uploadToCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';


const addRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    
    if(!hotelId || !isValidObjectId(hotelId)){
        throw new ApiError(400, "Invalid hotel id!");
    }
    
    const valResult = validationResult(req);
    if(!valResult.isEmpty()){
        throw new ApiError(400, "Invalid hotel data!", valResult.errors);
    }
    
    const hotelExists = await Hotel.exists({_id: hotelId, owner: req.user._id});
    if(!hotelExists){
        throw new ApiError(400, "Invalid hotel id!");
    }
    
    const {name, description, bedType, bedCount, pricePerNight, view, roomSize, totalQuantity, roomNumbers, adults, children, facilities} = req.body;
    
    const images = req.files;
    if(!images || images.length < 3 || images.length > 6){
        throw new ApiError(400, "No. of images must be in the range of 3-6!");
    }
    
    let imageUrls;

    try{
        const imageUploadPromises = images.map(image => uploadToCloudinary(image));    
        imageUrls = await Promise.all(imageUploadPromises);
    }
    catch(error){
        if(process.env.NODE_ENV !== 'production'){
            console.log(error);
        }

        throw new ApiError(500, "Error uploading images!");
    }

    const room = await Room.create({name, description, bedType, bedCount, pricePerNight, view, roomSize, totalQuantity, availableQuantity: totalQuantity, roomNumbers, capacityPerRoom: {adults, children}, facilities, images: imageUrls, hotel: hotelId});
    if(!room){
        throw new ApiError("Error adding room!");
    }
    
    const hotelUpdateResult = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {$inc: {totalRooms: totalQuantity, availableRooms: totalQuantity}});
    if(hotelUpdateResult.modifiedCount === 0){
        throw new ApiError("Error adding room!");
    }
    
    res.status(201).json(new ApiResponse(201, null, "Room added succesfully!"));
});


const getAllHotelRooms = asyncHandler(async (req, res) => {
    const {hotelId} = req.params;
    
    if(!hotelId || !isValidObjectId(hotelId)){
        throw new ApiError(400, 'Invalid hotel id!');
    }
    
    const hotelExists = await Hotel.exists({_id: hotelId, owner: req.user._id});
    if(!hotelExists){
        throw new ApiError(400, 'Invalid hotel id!');
    }
    
    const rooms = await Room.find({hotel: hotelId}).select('-__v -description -images -roomNumbers -facilities -hotel -createdAt -updatedAt').lean();
    
    res.status(200).json(new ApiResponse(200, rooms, "Hotel rooms fetched successfully!"));
});


const updateRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    const roomId = req.params?.roomId;
    
    if(!hotelId || !roomId || !isValidObjectId(hotelId) || isValidObjectId(roomId)){
        throw new ApiError(400, "Invalid hotel or room id!");
    }

    const validationRes = validationResult(req);
    if(!validationRes || validationRes.isEmpty()){
        throw new ApiError(400, "Invalid room data!", validationRes.errors);
    }

    const oldImageUrls = await Room.findOne({id:roomId, hotel:hotelId}, {images:1}).lean();
    if(!oldImageUrls){
        throw new ApiError(400, "Invalid hotel or room id!");
    }

    const {name, description, bedType, bedCount, pricePerNight, view, roomSize, adults, children, facilities, totalQuantity, roomNumbers, imageUrls} = req.body;
    
    const images = req.files; 
    if(!images || (images.length + (imageUrls?.length || 0)) < 3 || (images.length + (imageUrls?.length || 0)) > 6){
        throw new ApiError('Images must be in the range of 3-6!');
    } 
    

    try{
        const imageUploadPromises = images.map(image => uploadToCloudinary(image));    
        const newImageUrls = await Promise.all(imageUploadPromises);

        const updatedRoom = await Room.updateOne({id: roomId, hotel:hotelId}, {name, description, bedType, bedCount, pricePerNight, view, roomSize, capacityPerRoom: {adults, children}, facilities: facilities || [], totalQuantity, roomNumbers, images: [...(imageUrls || []), ...newImageUrls]}).lean();
        if(updatedRoom.modifiedCount !== 1){
            throw new ApiError(400, "Error updating hotel room!");
        }
        
        const imagesToDelete = await oldImageUrls.map(url => !imageUrls?.includes(url));
        const imageDeletePromises = imagesToDelete.map(url => deleteFromCloudinary(url));
        await Promise.all(imageDeletePromises);
        
        res.status(200).json(new ApiResponse(200, "Room updated successfully!"));
    }catch(e){

    }
});


export {
    addRoom,
    getAllHotelRooms,
    updateRoom
}