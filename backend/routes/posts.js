const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { createPost, editPost, deletePost } = require('../controllers/postController.js');

// Routes for managing posts
router.post('/path', function(req, res, next) {

});
router.put('/:id', auth, editPost);
router.delete('/:id', auth, deletePost);

module.exports = router;