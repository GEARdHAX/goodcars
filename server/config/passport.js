const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy; // <-- NEW
const User = require('../models/userModel');

module.exports = function (passport) {
    // 1. JWT Strategy (for protecting routes)
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user); // Attach user to req.user
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        })
    );

    // 2. Google OAuth Strategy (for Google Sign-In)
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    // Check if user already exists via Google ID
                    let user = await User.findOne({ googleId: profile.id });

                    if (user) {
                        return done(null, user); // User found, log them in
                    }

                    // Check if user exists via email (e.g., they used OTP first)
                    user = await User.findOne({ email: profile.emails[0].value });

                    if (user) {
                        // User found, link their Google account
                        user.googleId = profile.id;
                        await user.save();
                        return done(null, user);
                    }

                    // Create new user if they don't exist
                    const newUser = await User.create({
                        googleId: profile.id,
                        fullName: profile.displayName,
                        email: profile.emails[0].value,
                        // You might want to get a mobile number on the next screen
                    });
                    return done(null, newUser);
                } catch (err) {
                    return done(err, false);
                }
            }
        )
    );

    // Used by session middleware
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};