const Post = require('../models/Post'); // Import model của bài viết

// Lấy tất cả bài viết
exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Tạo bài viết mới
exports.createPost = async(req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Sửa bài viết
exports.editPost = async(req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xóa bài viết
exports.deletePost = async(req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bài viết đã được xóa' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};