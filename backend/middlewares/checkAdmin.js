const User = require('../models/User'); // Adjust the path as needed

const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'You are not an admin' });
        }

        next(); // User is admin, proceed to the next middleware/route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = checkAdmin;
