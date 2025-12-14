const mockDb = require('../utils/mockDb');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// Helper to simulate MongoDB _id
const generateId = () => Math.random().toString(36).substr(2, 9);

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = mockDb.users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            _id: generateId(),
            username,
            email,
            password: hashedPassword,
            profilePic: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            followers: [],
            following: [],
            createdAt: new Date(),
        };

        mockDb.users.push(newUser);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
            token: generateToken(newUser._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = mockDb.users.find(u => u.email === email);

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
