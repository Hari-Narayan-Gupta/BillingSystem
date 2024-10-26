const express = require('express');
const { register, login } = require('../controllers/authController'); // Adjust the path accordingly
const router = express.Router();

// User Registration
router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
    // Invalidate the token on the client side by just sending a success response
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
