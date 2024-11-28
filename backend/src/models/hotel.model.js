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
        enum: [0, 1, 2, 3, 4, 5]
    },
    images: [{
        type: String,
        required: true
    }],
    totalRooms: {
        type: Number,
        min: 0,
        default: 0
    },
    availableRooms: {
        type: Number,
        min: 0,
        default: 0
    },
    contactNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
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