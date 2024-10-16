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
    
    const {name, description, type, pricePerRoom, totalQuantity, roomNumbersList, capacityPerRoom, facilities} = req.body;
    
    const images = req.files;
    if(!images || images.length < 3 || images.length > 6){
        throw new ApiError(400, "No. of images must be in the range of 3-6!");
    }
    
    var imageUrls;

    // try{
    //     const imageUploadPromises = await images.map(image => uploadToCloudinary(image));    
    //     imageUrls = await Promise.all(imageUploadPromises);
    // }
    // catch(error){
    //     if(process.env.NODE_ENV !== 'production'){
    //         console.log(error);
    //     }

    //     throw new ApiError(500, "Error uploading images!");
    // }

    console.log(req.body);    
    // const room = await Room.create({name, description, type, pricePerRoom, totalQuantity, quantityAvailable: totalQuantity, roomNumbers: roomNumbersList, capacityPerRoom, facilities, images: imageUrls, hotel: hotelId}).lean();
    // if(!room){
    //     throw new ApiError("Error adding room!");
    // }
    
    // const hotelUpdateRes = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {$inc: {totalRooms: totalQuantity, availableRooms: totalQuantity}});
    // if(hotelUpdateRes.modifiedCount === 0){
    //     throw new ApiError("Error adding room!");
    // }
    
    res.status(201).json(new ApiResponse(201, "Room added succesfully!"));
});


export {
    addRoom
}