import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Hotel} from '../models/hotel.model.js';
import {validationResult} from 'express-validator';
import {uploadToCloudinary} from '../utils/cloudinary.js';


const createHotel = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ApiError(400, 'Invalid hotel data!', result.errors);
    }

    const {name, address, city, country, type, description, starRating, contactNo, email, facilities} = req.body;
   
    const images = req.files;
    if(!images || images.length === 0){
        throw new ApiError('Images are required!');
    }
    
    const uploadPromises = images.map((image) => {
        return uploadToCloudinary(image);
    });
    
    const uploadUrls = await Promise.all(uploadPromises); 
    if(!uploadUrls){
        throw new ApiError(400, 'Failed to upload images!');
    }

    const hotel = await Hotel.create({name, address, city, country, type, description, starRating, contactNo, email, owner: req.user._id, email, facilities, images: uploadUrls});
    
    if(!hotel){
        throw new ApiError(400, 'Failed to add hotel!');
    }

    res.status(201).json(new ApiResponse(201, hotel, "Hotel added successfully!"));
});


export {
    createHotel
}