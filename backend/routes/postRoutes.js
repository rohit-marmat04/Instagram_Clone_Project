const express = require('express');
const { createPost, getFeedPosts, likePost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getFeedPosts);
router.route('/:id/like').put(protect, likePost);

module.exports = router;
