const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    createCarListing,
    getAllCars,
    getCarById,
    updateCarListing,
    deleteCarListing,
} = require('../controllers/carController');
const { isAgent } = require('../middleware/authMiddleware');

// --- Public Routes ---

// @desc    Get all cars (with filters)
// @route   GET /api/cars
router.get('/', getAllCars);

// @desc    Get a single car by ID
// @route   GET /api/cars/:id
router.get('/:id', getCarById);


// --- Protected Agent Routes ---

// Authenticate with JWT strategy
const jwtAuth = passport.authenticate('jwt', { session: false });

// @desc    Create a new car listing
// @route   POST /api/cars
router.post('/', jwtAuth, isAgent, createCarListing);

// @desc    Update a car listing
// @route   PUT /api/cars/:id
router.put('/:id', jwtAuth, isAgent, updateCarListing);

// @desc    Delete a car listing
// @route   DELETE /api/cars/:id
router.delete('/:id', jwtAuth, isAgent, deleteCarListing);

module.exports = router;