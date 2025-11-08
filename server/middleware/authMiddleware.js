// Middleware to check for 'agent' role
const isAgent = (req, res, next) => {
    // passport.authenticate('jwt') attaches the user to req.user
    if (req.user && req.user.role === 'agent') {
        next(); // User is an agent, proceed
    } else {
        res.status(403).json({ message: 'Forbidden: Access restricted to agents.' });
    }
};

module.exports = { isAgent };