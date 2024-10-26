// seedProducts.js
const mongoose = require('mongoose');
const Product = require('../models/Product'); // Assuming this is your product model
require('dotenv').config(); // Use dotenv for the MongoDB connection string

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.log('MongoDB connection error:', err);
  });

// Menu items array
const products = [
  { name: 'Tea', price: 15 },
  { name: 'Kullad Tea', price: 20 },
  { name: 'Spl. Kullad Tea', price: 25 },
  { name: 'Black Coffee (Without Sugar)', price: 25 },
  { name: 'Black Coffee', price: 25 },
  { name: 'Hot Coffee', price: 30 },
  { name: 'Veg Soup', price: 100 },
  { name: 'Tomato Soup', price: 100 },
  { name: 'Sweetcorn Soup', price: 120 },
  { name: 'Veg Manchow Soup', price: 120 },
  { name: 'Veg Hot & Sour Soup', price: 120 },
  { name: 'Chicken Soup', price: 140 },
  { name: 'Chicken Manchow Soup', price: 170 },
  { name: 'Chicken Hot & Sour Soup', price: 170 },
  { name: 'Plain Paratha', price: 35 },
  { name: 'Aloo Paratha', price: 50 },
  { name: 'Aloo Pyaz Paratha', price: 55 },
  { name: 'Mix Veg Paratha', price: 70 },
  { name: 'Paneer Paratha', price: 80 },
  { name: 'Gobhi Paratha', price: 60 },
  { name: 'Mooli Paratha', price: 60 },
  { name: 'Egg Paratha', price: 90 },
  { name: 'Chole Bhature', price: 90 },
  { name: 'Plain Maggi', price: 50 },
  { name: 'Veg Maggi', price: 60 },
  { name: 'Egg Maggi (2 eggs)', price: 90 },
  { name: 'Bread Omelette', price: 50 },
  { name: 'Egg Bhurji (4 eggs)', price: 70 },
  { name: 'White Sauce Pasta', price: 150 },
  { name: 'Red Sauce Pasta', price: 150 },
  { name: 'Pink Sauce Pasta', price: 140 },
  { name: 'Chicken White Sauce Pasta', price: 210 },
  { name: 'Veg Burger', price: 80 },
  { name: 'Chicken Burger', price: 100 },
  { name: 'Vegetable Momo Steamed', price: 80 },
  { name: 'Paneer Momo Steamed', price: 100 },
  { name: 'Chicken Momo Steamed', price: 120 },
  { name: 'Veg Biryani', price: 130 },
  { name: 'Chicken Biryani', price: 170 },
  { name: 'Egg Curry (2 pcs)', price: 120 },
  { name: 'Veg Pulao', price: 140 },
  { name: 'Chicken Pulao', price: 180 },
  { name: 'Paneer Butter Masala', price: 200 },
  { name: 'Veg Korma', price: 180 },
  { name: 'Chicken Curry', price: 210 },
  { name: 'Paneer Tikka', price: 220 },
  { name: 'Veg Tandoori Platter', price: 300 },
  { name: 'Chicken Tandoori Platter', price: 350 },
  { name: 'Butter Naan', price: 30 },
  { name: 'Garlic Naan', price: 35 },
  { name: 'Roti', price: 20 },
  { name: 'Stuffed Kulcha', price: 60 },
  { name: 'Mixed Veg Curry', price: 150 },
  { name: 'Dal Makhani', price: 150 },
  { name: 'Dum Aloo', price: 130 },
  { name: 'Paneer Palak', price: 180 },
  { name: 'Fish Curry', price: 240 },
  { name: 'Prawn Curry', price: 280 },
  { name: 'Chocolate Cake', price: 90 },
  { name: 'Vanilla Ice Cream', price: 50 },
  { name: 'Gulab Jamun', price: 70 },
  { name: 'Fruit Salad', price: 80 },
  
];

// I Insert the products into the database in the existing collection products
const seedProducts = async () => {
  try {
    await Product.deleteMany(); 
    await Product.insertMany(products); 
    console.log('Products added successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.log('Error seeding products:', err);
  }
};

seedProducts();
