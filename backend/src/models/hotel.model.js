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
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    roomsAvailable: {
        type: Number,
        required: true
    },
    contactNo: {
        type: Number,
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
        ref: 'User'
    },
    facilities: [{
        type: String,
        trim: true,
        required: true
    }]
}, {timestamps: true});


export const Hotel = mongoose.model('Hotel', hotelSchema);