const jwt = require('jsonwebtoken');
const mockDb = require('../utils/mockDb');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = mockDb.users.find(u => u._id === decoded.id);
            if (user) {
                const { password, ...userWithoutPassword } = user;
                req.user = userWithoutPassword;
                next();
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
