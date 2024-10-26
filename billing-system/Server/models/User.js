const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'], // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
    is_verified: {
        type: Number,
        default: 0
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash if password is new or modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
    next();
});

// Method to compare password for authentication
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
