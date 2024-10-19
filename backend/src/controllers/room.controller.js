import {asyncHandler} from '../utils/asyncHandler.js';
import {isValidObjectId} from 'mongoose';
import {ApiError} from '../utils/ApiError.js';
import {validationResult} from 'express-validator';
import {Hotel} from '../models/hotel.model.js';
import {Room} from '../models/room.model.js';
import {uploadToCloudinary} from '../utils/cloudinary.js';
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
    
    const {name, description, type, pricePerNight, totalQuantity, roomNumbers, adults, children, facilities} = req.body;
    
    const images = req.files;
    if(!images || images.length < 3 || images.length > 6){
        throw new ApiError(400, "No. of images must be in the range of 3-6!");
    }
    
    let imageUrls;

    try{
        const imageUploadPromises = await images.map(image => uploadToCloudinary(image));    
        imageUrls = await Promise.all(imageUploadPromises);
    }
    catch(error){
        if(process.env.NODE_ENV !== 'production'){
            console.log(error);
        }

        throw new ApiError(500, "Error uploading images!");
    }

    const room = await Room.create({name, description, type, pricePerNight, totalQuantity, quantityAvailable: totalQuantity, roomNumbers, capacityPerRoom: {adults, children}, facilities, images: imageUrls, hotel: hotelId});
    if(!room){
        throw new ApiError("Error adding room!");
    }
    
    const hotelUpdateResult = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {$inc: {totalRooms: totalQuantity, availableRooms: totalQuantity}});
    if(hotelUpdateResult.modifiedCount === 0){
        throw new ApiError("Error adding room!");
    }
    
    res.status(201).json(new ApiResponse(201, null, "Room added succesfully!"));
});


export {
    addRoom
}