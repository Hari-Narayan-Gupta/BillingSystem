const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
    cart: {
        type: Array, // You can define the specific structure of your cart items if needed
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '35d', // Automatically delete the document after 35 days
    },
});

module.exports = mongoose.model('Bill', BillSchema);
