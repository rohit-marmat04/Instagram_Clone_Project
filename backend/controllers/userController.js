const mockDb = require('../utils/mockDb');

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = mockDb.users.find(u => u._id === req.params.id);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.json(userWithoutPassword);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Follow a user
// @route   PUT /api/users/follow/:id
// @access  Private
const followUser = async (req, res) => {
    if (req.user._id === req.params.id) {
        return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    try {
        const userToFollow = mockDb.users.find(u => u._id === req.params.id);
        const currentUser = mockDb.users.find(u => u._id === req.user._id);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!userToFollow.followers.includes(req.user._id)) {
            userToFollow.followers.push(req.user._id);
            currentUser.following.push(req.params.id);
            res.status(200).json({ message: 'User followed' });
        } else {
            res.status(400).json({ message: 'You already follow this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Unfollow a user
// @route   PUT /api/users/unfollow/:id
// @access  Private
const unfollowUser = async (req, res) => {
    if (req.user._id === req.params.id) {
        return res.status(400).json({ message: 'You cannot unfollow yourself' });
    }

    try {
        const userToUnfollow = mockDb.users.find(u => u._id === req.params.id);
        const currentUser = mockDb.users.find(u => u._id === req.user._id);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (userToUnfollow.followers.includes(req.user._id)) {
            userToUnfollow.followers = userToUnfollow.followers.filter(id => id !== req.user._id);
            currentUser.following = currentUser.following.filter(id => id !== req.params.id);
            res.status(200).json({ message: 'User unfollowed' });
        } else {
            res.status(400).json({ message: 'You do not follow this user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUserProfile, followUser, unfollowUser };
