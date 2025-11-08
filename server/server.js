const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Core Middleware ---
// Enable CORS
app.use(cors());
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Passport Middleware ---
app.use(passport.initialize());
// Passport Config (passing passport into the config function)
require('./config/passport')(passport);

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));

// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));