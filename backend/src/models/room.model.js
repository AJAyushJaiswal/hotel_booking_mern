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
    type: {
        type: 'String',
        required: true
    },
    pricePerRoom: {
        type: Number,
        required: true,
        min: 0
    },
    totalQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    quantityAvailable: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: 'String',
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
            default: 0
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
}, {timestamps: true});


export const Room = mongoose.model('Room', roomSchema);