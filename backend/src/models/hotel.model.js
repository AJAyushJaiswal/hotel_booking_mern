import mongoose from 'mongoose';


const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    starRating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    totalRooms: {
        type: Number,
        required: true,
        min: 1
    },
    roomsAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    facilities: [{
        type: String,
        trim: true,
        required: true
    }]
}, {timestamps: true});


export const Hotel = mongoose.model('Hotel', hotelSchema);