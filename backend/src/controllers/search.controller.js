import {asyncHandler} from '../utils/asyncHandler.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../utils/ApiError.js';
import {Hotel} from '../models/hotel.model.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {isValidObjectId, Types} from 'mongoose';

const searchHotelRooms = asyncHandler(async (req, res) => {
    const valRes = validationResult(req);
    if(!valRes?.isEmpty()){
        throw new ApiError(400, "Invalid search query!", valRes.errors);
    }

    const {location, adultCount, childCount, checkInDate, checkOutDate, roomCount} = req.query;
    
    const pageSize = 10;
    const pageNumber = parseInt(req.query.pageNumber);
    const skip = pageSize * (pageNumber - 1);
    
    // TODO: use checkInDate and checkOutDate for filtering after booking collection has been created
    
    const searchResult = await Hotel.aggregate([
        {
            $match: {
                availableRooms: {$gte: 0},
                $or: [
                    {city: new RegExp(location, 'i')},
                    {address: new RegExp(location, 'i')},
                    {country: new RegExp(location, 'i')},
                ]
            }
        },
        {
            $lookup: {
                from: 'rooms',
                localField: '_id',
                foreignField: 'hotel',
                as: 'rooms',
                pipeline: [
                    {
                        $match: {
                            $and: [
                                {'availableQuantity': {$gt: 0}},
                                {'capacityPerRoom.adults': {$gte: parseInt(adultCount)}},
                                {'capacityPerRoom.children': {$gte: parseInt(childCount)}},
                            ]
                        }
                    },
                    {
                        $project: {
                            _id: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                roomCount: { 
                    $size: "$rooms"
                }
            }
        },
        {
            $match: {
                roomCount: {$gte: parseInt(roomCount)}
            }
        },
        {
            $facet: {
                totalHotelsMatched: [
                    {
                        $count: 'count'
                    }
                ],
                hotels: [
                    {
                        $skip: skip
                    },
                    {
                        $limit: pageSize
                    },
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            address: 1,
                            city: 1,
                            country: 1,
                            starRating: 1,
                            images: 1,
                            type: 1,
                            facilities: 1,
                            roomCount: 1,
                            rooms: 1
                        }
                    }
                ] 
            }
        },
        {
            $project: {
                hotels: 1,
                totalHotelsMatched: {$arrayElemAt: ["$totalHotelsMatched.count", 0]}
            }
        }
    ]);

    if(!searchResult){
        throw new ApiError(400, "Error fetching search results!");
    }
    
    const totalResults = searchResult[0].totalHotelsMatched || 0;
    const totalPages = Math.ceil(totalResults / pageSize);

    if(totalPages > 0 && pageNumber > totalPages){
        throw new ApiError(400, "Page not found!");
    }
    
    const pagination = {
        totalResults: totalResults,
        totalPages: totalPages,
        pageNumber: pageNumber
    }
    
    res.status(200).json(new ApiResponse(200, {hotels: searchResult[0].hotels, pagination}, "Search results fetched successfully!"));
});


const getHotel = asyncHandler(async (req, res) => {
    const hotelId = req.params.hotelId;
    if(!hotelId || !isValidObjectId(hotelId)){
        throw new ApiError(400, "Invalid hotel id!");
    }
    
    const {rooms} = req.body;
    if(!rooms){
        throw new ApiError(400, "Invalid room ids!");
    }

    const roomIds = rooms.map(obj => new Types.ObjectId(obj._id));
    
    roomIds.forEach(roomId => {
        if(!isValidObjectId(roomId)){
            throw new ApiError(400, "Invalid room ids");
        }
    });
    
    const data = await Hotel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(hotelId)
            }
        },
        {
            $lookup: {
                from: 'rooms',
                localField: '_id',
                foreignField: 'hotel',
                as: 'rooms',
                pipeline: [
                    {
                        $match: {
                            _id: {
                                $in: [...roomIds]
                            }
                        }
                    },
                    {
                        $project: {
                            name: 1,
                            description: 1,
                            bedType: 1,
                            bedCount: 1,
                            pricePerNight: 1,
                            view: 1,
                            roomSize: 1,
                            availableQuantity: 1,
                            images: 1,
                            capacityPerRoom: 1,
                            facilities: 1,
                        }
                    }
                ]
            }
        },
        {
            $project: {
                name: 1,
                address: 1,
                city: 1,
                country: 1,
                type: 1,
                description: 1,
                images: 1,
                contactNo: 1,
                email: 1,
                facilities: 1,
                rooms: 1
            }
        }
    ]);
    
    if(!data){
        throw new ApiError(400, "Error fetching hotel data!");
    }
    
    res.status(200).json(new ApiResponse(200, "Hotel fetched successfully!", data));
});


export {
    searchHotelRooms,
    getHotel
}