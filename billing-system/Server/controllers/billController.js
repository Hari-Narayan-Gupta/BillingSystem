const Bill = require('../models/Bill'); // Import the Bill model
const rateLimit = require('express-rate-limit');

// Create a rate limiter to limit bill creation
const billLimiter = rateLimit({
    windowMs: 35 * 24 * 60 * 60 * 1000, // 35 days
    max: 1, // Limit each IP to 1 request per windowMs
    message: "You can only generate one bill every 35 days",
});

// Function to handle the creation of a bill
const storeBill = async (req, res) => {
    const { cart, total } = req.body;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
        return res.status(400).json({ message: 'Cart must be a non-empty array.' });
    }
    if (total == null || isNaN(total)) {
        return res.status(400).json({ message: 'Total must be a valid number.' });
    }

    try {
        const expiryDate = new Date(Date.now() + 35 * 24 * 60 * 60 * 1000); // Set expiry date to 35 days from now

        const newBill = new Bill({
            cart,
            total,
            createdAt: Date.now(),
            expiryDate: expiryDate
        });

        await newBill.save();
        res.status(201).json({ message: 'Bill saved successfully!', bill: newBill });
    } catch (error) {
        console.error('Error saving bill:', error.message);
        res.status(500).json({ message: 'Error saving bill: ' + error.message });
    }
};

const fetchBills = async(req, res) => {
    try {
        const bills = await Bill.find({
            createdAt: { $gte: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000) } // Last 35 days
        });
        res.status(200).json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Error fetching bills' });
    }
}

// Export the controller functions
module.exports = {
    storeBill,
    billLimiter, // Export the rate limiter to use in routes
    fetchBills
};
