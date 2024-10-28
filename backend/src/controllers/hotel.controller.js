import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Hotel} from '../models/hotel.model.js';
import {validationResult} from 'express-validator';
import {uploadToCloudinary, deleteFromCloudinary} from '../utils/cloudinary.js';
import {isValidObjectId} from 'mongoose';



const getMyHotels = asyncHandler(async (req, res) => {
    const hotels = await Hotel.find({owner: req.user._id}, {__v: 0, description: 0, images: 0, contactNo: 0, email: 0, owner: 0, facilities: 0}).lean();
    
    return res.status(200).json(new ApiResponse(200, hotels, "Hotels fetched successfully!"));
})


const getHotel = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    
    if(!hotelId){
        throw new ApiError(400, 'Hotel Id is required!');
    }
    
    if(!isValidObjectId(hotelId)){
        throw new ApiError(400, 'Invalid Hotel Id!');
    }
    
    const hotel = await Hotel.findOne({_id: hotelId, owner:req.user._id}).select('-__v -totalRooms -availableRooms -owner -createdAt -updatedAt').lean();
    
    if(!hotel){
        throw new ApiError(400, 'Invalid Hotel Id!');
    }
    
    return res.status(200).json(new ApiResponse(200, hotel, "Hotel fetched successfully!"));
})


const createHotel = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        throw new ApiError(400, 'Invalid hotel data!', result.errors);
    }

    const {name, address, city, country, type, description, starRating, contactNo, email, facilities} = req.body;
    
    const images = req.files;
    if(!images || images.length < 3 || images.length > 6){
        throw new ApiError(400, 'Images must be in the range of 3-6!');
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
    
    delete hotel._doc.__v;
    delete hotel._doc.createdAt;
    delete hotel._doc.updatedAt;
    delete hotel._doc.owner;

    res.status(201).json(new ApiResponse(201, hotel, "Hotel added successfully!"));
});


const updateHotel = asyncHandler(async (req, res) => {
    const valResult = validationResult(req);
    if(!valResult.isEmpty()){
        throw new ApiError(400, "Invalid hotel data!", valResult.errors);
    }
    
    const hotelId = req.params?.hotelId;
    if(!hotelId || !isValidObjectId(hotelId)){
        throw new ApiError(400, "Invalid Hotel Id!");
    }
    
    const currentHotel = await Hotel.findOne({_id: hotelId, owner: req.user._id}).select('images').lean();
    if(!currentHotel){
        throw new ApiError(400, "Invalid Hotel Id!");
    }

    const {name, address, city, country, description, type, starRating, contactNo, email, facilities, images: imageUrls} = req.body;
    const imageFiles = req.files;
    
    const totalImages = (imageFiles?.length || 0) + (imageUrls?.length || 0);
    if(!imageFiles || totalImages < 3 || totalImages > 6){
        throw new ApiError(400, "Images must be in the range of 3-6!");
    }
    
    const imageUploadPromises = imageFiles.map(image => uploadToCloudinary(image));
    const newImageUrls = await Promise.all(imageUploadPromises);
    
    const hotelUpdateResult = await Hotel.updateOne({_id: hotelId, owner: req.user._id}, {
        name, address, city, country, description, type, 
        starRating: starRating || null, 
        contactNo, 
        email: email || null, 
        facilities: facilities || [], 
        images: [...(imageUrls || []), ...newImageUrls]
    }).lean();

    if(hotelUpdateResult.modifiedCount === 0){
        throw new ApiError(400, "Error updating hotel!");
    }

    const imagesToDelete = currentHotel.images?.filter((url) => !imageUrls?.includes(url)) || [];
    
    const imageDeletePromises = imagesToDelete.map((url) => deleteFromCloudinary(url));
    await Promise.all(imageDeletePromises);

    res.status(200).json(new ApiResponse(200, null, "Hotel updated successfully!"));
});


const deleteHotel = asyncHandler(async (req, res) => {
    const hotelId = req.params?.hotelId;
    
    if(!hotelId || !isValidObjectId(hotelId)){
        throw new ApiError(400, "Invalid Hotel Id!");
    }
    
    const deletedHotel = await Hotel.findOneAndDelete({_id: hotelId, owner: req.user._id}).select('images').lean();
    
    if(!deletedHotel){
        throw new ApiError(400, "Error deleting hotel!");
    }

    try{
        const deletePromises = deletedHotel.images.map(url => deleteFromCloudinary(url)); 
        await Promise.all(deletePromises);
    }
    catch(error){
        if(process.env.NODE_ENV !== 'production') console.log(error);

        throw new ApiError(500, "Error deleting hotel!");
    }
    
    res.status(200).json(new ApiResponse(200, null, "Hotel deleted successfully!"));
});


export {
    getMyHotels,
    getHotel,
    createHotel,
    updateHotel,
    deleteHotel
}