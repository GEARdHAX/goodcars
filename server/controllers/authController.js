const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
// controllers/authController.js snippet:
const twilio = require('twilio');
// Initialize Twilio client (This is likely where you use the raw env vars)
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const generateToken = (res, user) => {
    const payload = {
        id: user._id,
        // Use optional chaining or defaults, but role and mobileNumber will exist.
        role: user.role,
        mobileNumber: user.mobileNumber,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.json({
        success: true,
        token: 'Bearer ' + token,
        user: {
            id: user._id,
            fullName: user.fullName,
            mobileNumber: user.mobileNumber,
            email: user.email,
            role: user.role, // <-- Include role in the response body
        },
    });
};

// @desc    Send OTP to user's mobile
// @route   POST /api/auth/send-otp
// controllers/authController.js

// controllers/authController.js

// ... (imports and twilioClient initialization)

exports.sendOTP = async (req, res, next) => {
    try {
        const { mobileNumber } = req.body;
        if (!mobileNumber) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        let user = await User.findOne({ mobileNumber });
        const existingRole = user ? user.role : 'new_user';
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        if (!user) {
            user = new User({ mobileNumber, role: 'user' });
        }

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        // --- TWILIO API CALL ---
        try {
            const message = await twilioClient.messages.create({
                body: `Your OTP for GOOD CARS is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: mobileNumber,
            });

            console.log('Twilio Message SID:', message.sid); // Log success

            res.status(200).json({
                success: true,
                message: 'OTP sent successfully.',
                userStatus: existingRole,
            });

        } catch (twilioError) {
            // --- THIS IS THE ADDED PART ---
            // This will log the specific Twilio error (e.g., 60001, 30007)
            console.error('Twilio API Error:', twilioError.message);
            console.error('Twilio Error Code:', twilioError.code);

            // Send a specific error back to the frontend
            res.status(500).json({
                message: 'Failed to send OTP. Please check server logs.'
            });
        }
        // --- END OF ADDED PART ---

    } catch (dbError) {
        // This catches database errors (like the E11000 you saw earlier)
        next(dbError);
    }
};

// @desc    Verify OTP and log user in
// @route   POST /api/auth/verify-otp
exports.verifyOTP = async (req, res, next) => {
    try {
        const { mobileNumber, otp } = req.body;
        if (!mobileNumber || !otp) {
            return res.status(400).json({ message: 'Mobile number and OTP are required' });
        }

        // Find user and select the OTP fields
        const user = await User.findOne({ mobileNumber }).select('+otp +otpExpires');

        // Check 1: User exists
        if (!user) {
            return res.status(400).json({ message: 'Invalid mobile number' });
        }

        // Check 2: OTP is not expired
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Check 3: OTP matches
        const isMatch = await user.compareOTP(otp);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Clear OTP fields after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Success! Generate and send JWT
        generateToken(res, user);
    } catch (error) {
        next(error);
    }
};

// @desc    Update user details after login (Image 3)
// @route   PUT /api/auth/update-details
exports.updateDetails = async (req, res, next) => {
    try {
        // req.user.id comes from the JWT 'protect' middleware
        const { fullName, ...otherDetails } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                fullName,
                ...otherDetails // Pass other fields like dateOfBirth, address
            },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};