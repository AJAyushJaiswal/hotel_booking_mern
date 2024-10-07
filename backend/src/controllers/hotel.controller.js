import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Hotel} from '../models/hotel.model.js';
import {validationResult} from 'express-validator';
import {uploadToCloudinary} from '../utils/cloudinary.js';



const getMyHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find({owner: req.user._id}, {__v: 0, }).lean();
    
    return res.status(200).json(new ApiResponse(200, hotels, "Hotels fetched successfully!"));
})


const getHotel = asyncHandler(async (req, res) => {
    const hotelId = req?.params?.hotelId;
    
    if(!hotelId){
        throw new ApiError('Hotel Id is required!');
    }
    
    const hotel = await Hotel.findOne({_id: hotelId, owner:req.user._id}).select('-__v -totalRooms -availableRooms').lean();
    
    if(!hotel){
        throw new ApiError('Invalid Hotel Id!');
    }
    
    delete hotel._doc.owner;
    
    return res.status(200).json(new ApiResponse(200, hotel, "Hotel fetched successfully!"));
})


const createHotel = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ApiError(400, 'Invalid hotel data!', result.errors);
    }

    const {name, address, city, country, type, description, starRating, contactNo, email, facilities} = req.body;
   
    const images = req.files;
    if(!images || images.length === 0){
        throw new ApiError(400, 'Images are required!');
    }
    
    const uploadPromises = images.map((image) => {
        return uploadToCloudinary(image);
    });
   
    try{
        var uploadUrls = await Promise.all(uploadPromises); 
    }
    catch(error){
        throw new ApiError(500, 'Failed to upload images!');
    }

    const hotel = await Hotel.create({name, address, city, country, type, description, starRating, contactNo, email, owner: req.user._id, facilities, images: uploadUrls});
    
    if(!hotel){
        throw new ApiError(400, 'Failed to add hotel!');
    }

    res.status(201).json(new ApiResponse(201, hotel, "Hotel added successfully!"));
});


export {
    getMyHotels,
    getHotel,
    createHotel
}