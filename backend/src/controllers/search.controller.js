import {asyncHandler} from '../utils/asyncHandler.js';
import {validationResult} from 'express-validator';
import {ApiError} from '../utils/ApiError.js';
import {Hotel} from '../models/hotel.model.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const searchHotelRooms = asyncHandler(async (req, res) => {
    const valRes = validationResult(req);
    if(!valRes?.isEmpty()){
        throw new ApiError(400, "Invalid search query!");
    }

    const {location, adultCount, childCount, checkInDate, checkOutDate} = req.query;
    
    const pageSize = 10;
    const pageNumber = parseInt(req.query.pageNumber);
    const skip = pageSize * (pageNumber - 1);
    
    const searchResult = await Hotel.aggregate([
        {
            $match: {
                availableRooms: {$gt: 0},
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
                roomCount: {$gt: 0}
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
    
    const pagination = {
        totalResults: searchResult[0].totalHotelsMatched,
        pageSize: pageSize,
        pageNumber: pageNumber
    }
    

    res.status(200).json(new ApiResponse(200, {hotels: searchResult[0].hotels, pagination}, "Search results fetched successfully!"));
});



export {
    searchHotelRooms
}