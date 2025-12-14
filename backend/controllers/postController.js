const mockDb = require('../utils/mockDb');
const generateId = () => Math.random().toString(36).substr(2, 9);

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
    try {
        const { caption, image } = req.body;

        const post = {
            _id: generateId(),
            user: req.user._id,
            caption,
            image,
            likes: [],
            comments: [],
            createdAt: new Date(),
        };

        mockDb.posts.push(post);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all posts (Head)
// @route   GET /api/posts
// @access  Private
const getFeedPosts = async (req, res) => {
    try {
        // Clone posts to avoid mutating source
        const posts = JSON.parse(JSON.stringify(mockDb.posts));

        // Populate user details manually
        posts.forEach(post => {
            const user = mockDb.users.find(u => u._id === post.user);
            post.user = user ? { _id: user._id, username: user.username, profilePic: user.profilePic } : null;

            // Populate comments
            post.comments = post.comments.map(commentId => {
                const comment = mockDb.comments.find(c => c._id === commentId);
                if (comment) {
                    const commentUser = mockDb.users.find(u => u._id === comment.user);
                    return {
                        ...comment,
                        user: commentUser ? { _id: commentUser._id, username: commentUser.username, profilePic: commentUser.profilePic } : null
                    };
                }
                return null;
            }).filter(c => c !== null);
        });

        // Sort by date desc
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like/Unlike a post
// @route   PUT /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
    try {
        const post = mockDb.posts.find(p => p._id === req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            // Unlike
            post.likes = post.likes.filter(id => id !== req.user._id);
        } else {
            // Like
            post.likes.push(req.user._id);
        }

        res.json(post.likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPost, getFeedPosts, likePost };
