const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc    Register a standard user
// @route   POST /api/auth/register-user
exports.registerUser = async (req, res, next) => {
    try {
        // --- UPDATED DESTRUCTURING ---
        // Pulling all required schema fields: firstName, lastName, contactNumber
        const { firstName, lastName, email, password, contactNumber } = req.body;

        // --- UPDATED INITIAL CHECK ---
        if (!firstName || !lastName || !email || !password || !contactNumber) {
            return res.status(400).json({ message: 'Please enter all required personal and contact fields.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // --- UPDATED CREATE CALL ---
        // Passing all new required fields to Mongoose
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            role: 'user' // Explicitly set role
            // dateOfBirth and address can be passed if included in req.body
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please log in.'
        });

    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// @desc    Register an agent
// @route   POST /api/auth/register-agent
exports.registerAgent = async (req, res, next) => {
    try {
        // --- UPDATED DESTRUCTURING ---
        // Pulling all required schema fields (both personal and agent-specific)
        const { firstName, lastName, email, password, dealershipName, contactNumber } = req.body;

        // --- UPDATED INITIAL CHECK ---
        if (!firstName || !lastName || !email || !password || !dealershipName || !contactNumber) {
            return res.status(400).json({ message: 'Please enter all required fields for agent registration.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // --- UPDATED CREATE CALL ---
        // Passing all required fields to Mongoose
        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            role: 'agent', // Explicitly set role
            dealershipName,
            // dateOfBirth and address can be passed if included in req.body
        });

        res.status(201).json({
            success: true,
            message: 'Agent registered successfully. Please log in.'
        });

    } catch (error) {
        next(error);
    }
};

// @desc    Login user/agent
// @route   POST /api/auth/login
exports.loginUser = (req, res) => {
    // This function remains unchanged as it uses the authenticated user object (req.user)
    const user = req.user;

    // Create the JWT payload
    const payload = {
        id: user._id,
        role: user.role,
        name: user.firstName + ' ' + user.lastName // Constructing full name for payload
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d' // Expires in 1 day
    });

    // Send the token back to the client
    res.json({
        success: true,
        token: 'Bearer ' + token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
};