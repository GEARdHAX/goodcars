const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, registerAgent, loginUser } = require('../controllers/authController');

// @desc    Register a normal user
// @route   POST /api/auth/register-user
router.post('/register-user', registerUser);

// @desc    Register an agent
// @route   POST /api/auth/register-agent
router.post('/register-agent', registerAgent);

// @desc    Login user/agent
// @route   POST /api/auth/login
// @access  Public
router.post(
    '/login',
    // Use 'local' strategy to authenticate
    passport.authenticate('local', { session: false, failWithError: true }),
    // If auth succeeds, the loginUser controller runs
    loginUser
);

module.exports = router;