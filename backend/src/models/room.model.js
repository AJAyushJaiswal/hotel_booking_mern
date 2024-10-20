import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    bedType: {
        type: 'String',
        required: true,
        trim: true
    },
    bedCount: {
        type: Number,
        required: true,
        min: 1
    },
    pricePerNight: {
        type: Number,
        required: true,
        min: 0
    },
    view: {
        type: 'String',
        required: true,
        trim: true
    },
    roomSize: {         // square meters
        type: Number,
        required: true,
        min: 1
    },
    images: [{
        type: String,
        required: true
    }],
    capacityPerRoom: {
        adults: {
            type: Number,
            required: true,
            min: 1
        },
        children: {
            type: Number,
            required: true,
            min: 0
        }
    },
    facilities: [{
        type: String,
        trim: true
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    totalQuantity: {
        type: Number,
        required: true,
        min: 1
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    roomNumbers: {
        type: [Number],
        required: true
    },
}, {timestamps: true});


export const Room = mongoose.model('Room', roomSchema);