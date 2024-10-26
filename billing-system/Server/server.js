const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const productRoutes = require('./routes/productRoutes'); // Ensure this path is correct
const billRoutes = require('./routes/billRoutes'); // Import the bill routes
require('dotenv').config();
const scheduler = require('./utils/scheduler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB using the connection URI from the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define your routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/bills', billRoutes); // Billing routes - added this line

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
