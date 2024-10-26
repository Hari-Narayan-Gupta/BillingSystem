const express = require('express');
const { storeBill, billLimiter, fetchBills } = require('../controllers/billController');

const router = express.Router();

// Apply the rate limiter to the bill creation route
router.post('/store', billLimiter, storeBill);
router.get('/history', fetchBills)

module.exports = router;
