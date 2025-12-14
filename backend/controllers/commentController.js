const mockDb = require('../utils/mockDb');
const generateId = () => Math.random().toString(36).substr(2, 9);

// @desc    Add a comment to a post
// @route   POST /api/comments
const addComment = async (req, res) => {
    try {
        const { postId, text } = req.body;

        const post = mockDb.posts.find(p => p._id === postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            _id: generateId(),
            user: req.user._id,
            post: postId,
            text,
            createdAt: new Date(),
        };

        mockDb.comments.push(comment);

        // Add to post
        post.comments.push(comment._id);

        // Populate user for return
        const user = mockDb.users.find(u => u._id === req.user._id);
        const populatedComment = {
            ...comment,
            user: user ? { _id: user._id, username: user.username, profilePic: user.profilePic } : null
        };

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addComment };
