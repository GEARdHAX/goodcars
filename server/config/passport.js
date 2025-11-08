const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = function (passport) {
    // 1. Local Strategy (for login)
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email }).select('+password');

                if (!user) {
                    return done(null, false, { message: 'That email is not registered' });
                }

                // Match password
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user); // User is valid
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    // 2. JWT Strategy (for protecting routes)
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET;

    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                // jwt_payload contains the { id, role } we signed
                const user = await User.findById(jwt_payload.id);

                if (user) {
                    return done(null, user); // Attach user to req.user
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
};