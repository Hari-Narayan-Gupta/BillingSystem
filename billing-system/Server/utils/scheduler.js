const mongoose = require('mongoose');
const cron = require('node-cron');
const Bill = require('../models/Bill'); // Import your Bill model

// Schedule a job to run every day at midnight
cron.schedule('0 0 * * *', async () => {
    try {
        // Get the current date
        const currentDate = new Date();

        // Remove expired bills
        const result = await Bill.deleteMany({ expiryDate: { $lt: currentDate } });
        console.log(`Removed ${result.deletedCount} expired bills.`);
    } catch (error) {
        console.error('Error removing expired bills:', error.message);
    }
});

