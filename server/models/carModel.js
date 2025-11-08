const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    // Link to the 'User' model
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    mileage: { type: Number, required: true },

    images: {
        type: [String], // An array of image URLs
        required: true,
        validate: [val => val.length > 0, 'At least one image is required']
    },

    transmission: {
        type: String,
        enum: ['Automatic', 'Manual'],
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    engineSize: { type: String },
    color: { type: String },
    city: { type: String, required: true },
    description: { type: String, required: true, maxlength: 2000 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);