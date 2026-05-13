const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    spanClass: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
