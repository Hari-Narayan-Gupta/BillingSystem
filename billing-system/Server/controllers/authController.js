const User = require('../models/User'); // Update the path accordingly
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,  // Store hashed password
            is_verified: 0  // Default to not verified
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User Login
const login = async (req, res) => {


    try {

        const { email, password } = req.body;

        console.log('Login request received:', { email, password });

        // Find user by email
        const userData = await User.findOne({ email: email });
        console.log('User found:', userData);
        if (userData) {

            const passwordMatch = await bcrypt.compare(password, userData.password);
            console.log('Password match result:', passwordMatch);

            // Create JWT token
            const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Login successful, token generated:', token);

            return res.status(200).json({ message: 'Login successful', token });
        }
        if (!userData) {
            console.log('Invalid email');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if user is verified
        if (!userData.is_verified) {
            return res.status(403).json({ message: 'Your account is not verified for login' });
        }

        // Log the plain text password and the hashed password
        // console.log('Password from request:', password);
        // console.log('Password stored in DB (hashed):', userData.password);

        // Compare password from request with hashed password in DB


        if (!passwordMatch) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }


    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Export controller methods
module.exports = {
    register,
    login,
};
