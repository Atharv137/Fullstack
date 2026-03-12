import Post from '../models/Post.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const post = await Post.create({
            title,
            content,
            author: req.user.id,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get posts with pagination
// @route   GET /api/posts
// @access  Private
export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Find posts by this user
        const posts = await Post.find({ author: req.user.id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Post.countDocuments({ author: req.user.id });

        res.status(200).json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
