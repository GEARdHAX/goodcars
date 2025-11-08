const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Assuming you installed 'bcrypt'

const userSchema = new mongoose.Schema({
    // Core Fields (Modified)
    firstName: {
        type: String,
        required: [true, 'Please add your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // Will not show password in query results
    },
    // Existing Field (Mobile Phone)
    contactNumber: {
        type: String,
        required: [true, 'Please add your mobile phone number']
    },
    // New Field
    dateOfBirth: {
        type: Date,
        required: false // Making this optional since it's common to skip
    },
    // New Nested Address Object
    address: {
        houseNumber: { type: String },
        street: { type: String },
        city: { type: String },
    },

    // Role & Agent-Specific Fields (Unchanged)
    role: {
        type: String,
        enum: ['user', 'agent'],
        default: 'user'
    },
    dealershipName: {
        type: String,
        required: [function () { return this.role === 'agent'; }, 'Dealership name is required for agents']
    },
}, {
    timestamps: true
});

// **IMPORTANT: Hash password before saving user**
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);