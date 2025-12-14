const express = require('express');
const { getUserProfile, followUser, unfollowUser } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/profile/:id', protect, getUserProfile);
router.put('/follow/:id', protect, followUser);
router.put('/unfollow/:id', protect, unfollowUser);

module.exports = router;
