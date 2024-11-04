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

    const hotelExists = await Hotel.exists({_id: hotelId, owner: req.user._id});
    if(!hotelExists){
        throw new ApiError(400, "Invalid hotel id!");
    }
    
    const valResult = validationResult(req);
    if(!valResult.isEmpty()){
        throw new ApiError(400, "Invalid hotel data!", valResult.errors);
    }
    
    
    const {name, description, bedType, bedCount, pricePerNight, view, roomSize, totalQuantity, roomNumbers, adults, children, facilities} = req.body;
    const images = req.files;

    if(!images || images.length < 3 || images.length > 6){
        throw new ApiError(400, "No. of images must be in the range of 3-6!");
    }
    
    const rooms = await Room.find({hotel: hotelId}, {roomNumbers: 1, _id: 0}).lean();
    const existingRoomNumbers = rooms?.flatMap(room => room.roomNumbers) || [];
    
    const alreadyUsedRooms = roomNumbers.filter(roomNo => existingRoomNumbers.includes(Number.parseInt(roomNo)));
    if(alreadyUsedRooms.length > 0){
        throw new ApiError(400, `Room${alreadyUsedRooms.length > 1 ? 's' : ''} ${alreadyUsedRooms.join(', ')} already exist${alreadyUsedRooms.length === 1 ? 's' : ''}!`);
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
        throw new ApiError(500, "Error adding room!");
    }
    
    const hotelUpdateResult = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {$inc: {totalRooms: totalQuantity, availableRooms: totalQuantity}});
    if(hotelUpdateResult.modifiedCount === 0){
        throw new ApiError(500, "Error adding room!");
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
    
    const rooms = await Room.find({hotel: hotelId}).select('-__v -description -images -facilities -hotel -createdAt -updatedAt').lean();
    if(!rooms){
        throw new ApiError(500, "Error getting hotel rooms!");
    }
    
    res.status(200).json(new ApiResponse(200, rooms, "Hotel rooms fetched successfully!"));
});


const getHotelRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    const roomId = req.params?.roomId;
    
    if(!hotelId || !roomId || !isValidObjectId(hotelId) || !isValidObjectId(roomId)){
        throw new ApiError(400, "Invalid hotel or room id!");
    }
    
    const room = await Room.findOne({_id: roomId, hotel: hotelId}).select('-__v -createdAt -updatedAt -hotel -availableQuantity').lean();
    if(!room){
        throw new ApiError(400, "Invalid hotel or room id!");
    }
    
    res.status(200).send(new ApiResponse(200, room, "Hotel Room fetched successfully!"));
});


const updateRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    const roomId = req.params?.roomId;
    
    if(!hotelId || !roomId || !isValidObjectId(hotelId) || !isValidObjectId(roomId)){
        throw new ApiError(400, "Invalid hotel or room id!");
    }
    
    const hotelExists = await Hotel.exists({_id: hotelId, owner: req.user._id}).lean();
    if(!hotelExists){
        throw new ApiError(400, "Invalid hotel or room id!");
    }

    const currentRoom = await Room.findOne({_id:roomId, hotel:hotelId}, {images: 1, _id: 0}).lean();
    if(!currentRoom){
        throw new ApiError(400, "Invalid hotel or room id!");
    }

    const validationRes = validationResult(req);
    if(!validationRes || !validationRes.isEmpty()){
        throw new ApiError(400, "Invalid room data!", validationRes.errors);
    }
    
    const {name, description, bedType, bedCount, pricePerNight, view, roomSize, adults, children, facilities, totalQuantity, roomNumbers, imageUrls} = req.body;
    const imageFiles = req.files; 
    
    const totalImages = (imageFiles?.length || 0) + (imageUrls?.length || 0);    
    if(!imageFiles || totalImages < 3 || totalImages > 6){
        throw new ApiError(400, "Images must be in the range of 3-6!");
    } 
    
    const isImageUrlsValid = imageUrls?.every(url => currentRoom.images.includes(url)) || true;
    if(!isImageUrlsValid){
        throw new ApiError(400, "Invalid image urls!");
    }

    const rooms = await Room.find({_id: {$ne: roomId}, hotel: hotelId}, {roomNumbers: 1, _id: 0}).lean();
    const existingRoomNumbers = rooms?.flatMap(room => room.roomNumbers) || [];
    
    const alreadyUsedRooms = roomNumbers.filter(roomNo => existingRoomNumbers.includes(Number.parseInt(roomNo)));
    if(alreadyUsedRooms.length > 0){
        throw new ApiError(400, `Room${alreadyUsedRooms.length > 1 ? 's' : ''} ${alreadyUsedRooms.join(', ')} already exist${alreadyUsedRooms.length === 1 ? 's' : ''}!`);
    }

    const imageUploadPromises = imageFiles.map(image => uploadToCloudinary(image));    
    const newImageUrls = await Promise.all(imageUploadPromises);

    const updatedRoom = await Room.updateOne({_id: roomId, hotel:hotelId}, {name, description, bedType, bedCount, pricePerNight, view, roomSize,
         capacityPerRoom: {adults, children}, 
         facilities: facilities || [], 
         totalQuantity, availableQuantity: totalQuantity, roomNumbers, 
         images: [...(imageUrls || []), ...(newImageUrls || [])]}).lean();
    if(updatedRoom.modifiedCount !== 1){
        throw new ApiError(400, "Error updating hotel room!");
    }
    
    const imagesToDelete = currentRoom.images?.filter(url => !imageUrls?.includes(url)) || [];
    const imageDeletePromises = imagesToDelete?.map(url => deleteFromCloudinary(url));
    await Promise.all(imageDeletePromises);
    
    res.status(200).json(new ApiResponse(200, null, "Room updated successfully!"));
});


const deleteRoom = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId; 
    const roomId = req.params?.roomId; 
    
    if(!hotelId || !roomId || !isValidObjectId(hotelId) || !isValidObjectId(roomId)){
        throw new ApiError(400, "Invalid hotel or room id!");
    }
    
    const hotelOwnedByUserExists = await Hotel.exists({_id: hotelId, owner: req.user.id}).lean();
    if(!hotelOwnedByUserExists){
        throw new ApiError(400, "Invalid hotel or room id!");
    }
    
    const deletedRoom = await Room.findOneAndDelete({_id: roomId, hotel: hotelId}).select('images totalQuantity availableQuantity -_id').lean();
    if(!deletedRoom){
        throw new ApiError(400, "Error removing the hotel room!");
    }
    
    const hotelUpdateResult = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {$inc: {totalRooms: -deletedRoom.totalQuantity, availableRooms: -deletedRoom.availableQuantity}}).lean();
    
    if(hotelUpdateResult.modifiedCount === 0){
        throw new ApiError(500, "Error removing the hotel room!");
    }
   
    try{
        const imageDeletePromises = deletedRoom.images?.map(url => deleteFromCloudinary(url)) || [];
        await Promise.all(imageDeletePromises);
    }
    catch(error){
        if(process.env.NODE_ENV !== 'production') console.log(error);

        throw new ApiError(500, "Error removing the hotel room!");
    }
    
    res.status(200).json(new ApiResponse(200, null, "Hotel room removed successfully!"));
});


export {
    addRoom,
    getAllHotelRooms,
    getHotelRoom,
    updateRoom,
    deleteRoom
}