const Car = require('../models/carModel');

// @desc    Create a new car listing
// @route   POST /api/cars
exports.createCarListing = async (req, res, next) => {
    try {
        const { make, model, year, price, mileage, images, transmission, fuelType, engineSize, color, city, description } = req.body;

        const car = new Car({
            make,
            model,
            year,
            price,
            mileage,
            images,
            transmission,
            fuelType,
            engineSize,
            color,
            city,
            description,
            sellerId: req.user.id // From passport.js JWT strategy
        });

        const createdCar = await car.save();
        res.status(201).json(createdCar);
    } catch (error) {
        next(error);
    }
};

// @desc    Get all cars (with filters)
// @route   GET /api/cars
exports.getAllCars = async (req, res, next) => {
    try {
        const { make, model, minPrice, maxPrice, year } = req.query;

        let filter = {};

        if (make) filter.make = make;
        if (model) filter.model = model;
        if (year) filter.year = Number(year);

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Find cars and populate seller info
        const cars = await Car.find(filter)
            .populate('sellerId', 'name dealershipName contactNumber')
            .sort({ createdAt: -1 });

        res.json(cars);
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single car by ID
// @route   GET /api/cars/:id
exports.getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id)
            .populate('sellerId', 'name dealershipName contactNumber');

        if (car) {
            res.json(car);
        } else {
            res.status(404);
            throw new Error('Car not found');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Update a car listing
// @route   PUT /api/cars/:id
exports.updateCarListing = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            res.status(404);
            throw new Error('Car not found');
        }

        // **Authorization Check: Ensure the user owns this listing**
        if (car.sellerId.toString() !== req.user.id) {
            res.status(403); // Forbidden
            throw new Error('User not authorized to update this listing');
        }

        // Update fields
        car.make = req.body.make || car.make;
        car.model = req.body.model || car.model;
        car.year = req.body.year || car.year;
        car.price = req.body.price || car.price;
        car.mileage = req.body.mileage || car.mileage;
        car.images = req.body.images || car.images;
        car.transmission = req.body.transmission || car.transmission;
        car.fuelType = req.body.fuelType || car.fuelType;
        car.city = req.body.city || car.city;
        car.description = req.body.description || car.description;
        // ... update other fields as needed

        const updatedCar = await car.save();
        res.json(updatedCar);

    } catch (error) {
        next(error);
    }
};

// @desc    Delete a car listing
// @route   DELETE /api/cars/:id
exports.deleteCarListing = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            res.status(404);
            throw new Error('Car not found');
        }

        // **Authorization Check: Ensure the user owns this listing**
        if (car.sellerId.toString() !== req.user.id) {
            res.status(403); // Forbidden
            throw new Error('User not authorized to delete this listing');
        }

        await car.deleteOne();
        res.json({ message: 'Car removed successfully' });

    } catch (error) {
        next(error);
    }
};