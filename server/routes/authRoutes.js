const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {
    sendOTP,
    verifyOTP,
    updateDetails,
} = require('../controllers/authController');

// --- OTP Flow ---
// @desc    Send OTP to mobile
// @route   POST /api/auth/send-otp
router.post('/send-otp', sendOTP);

// @desc    Verify OTP and log user in
// @route   POST /api/auth/verify-otp
router.post('/verify-otp', verifyOTP);

// --- Google OAuth Flow ---
// @desc    Initiate Google Sign-In
// @route   GET /api/auth/google
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false, // We are using JWT, not sessions
        failureRedirect: `${process.env.CLIENT_URL}/login-failed`, // Redirect on frontend
    }),
    (req, res) => {
        // User is authenticated by Passport, req.user is populated.
        // Now, we manually create and send the JWT.
        const payload = {
            id: req.user.id,
            fullName: req.user.fullName,
            email: req.user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Redirect back to the React app with the token
        // The frontend will have to parse this token from the URL
        res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    }
);

// --- Profile Update ---
// @desc    Update user details (e.g., add fullName after login)
// @route   PUT /api/auth/update-details
router.put(
    '/update-details',
    passport.authenticate('jwt', { session: false }), // Protect this route
    updateDetails
);

module.exports = router;