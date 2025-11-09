const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session'); // <-- NEW
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --- Core Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Session Middleware (for Google OAuth) --- NEW
app.use(
    session({
        secret: 'a_temporary_secret_for_oauth', // Use a random string
        resave: false,
        saveUninitialized: false,
    })
);

// --- Passport Middleware ---
app.use(passport.initialize());
app.use(passport.session()); // <-- NEW (for OAuth)
require('./config/passport')(passport);

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes')); // Car routes remain unchanged

// --- Error Handling Middleware ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));