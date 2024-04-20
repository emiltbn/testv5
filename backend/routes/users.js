const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


// dang ky
router.post('/register', async(req, res) => {
    try {

        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ msg: 'Email đã tồn tại' });
        }

        // Mk
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // tao new
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Luu
        await newUser.save();

        res.status(201).json({ msg: 'Người dùng đã được tạo thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;


//dang nhap
// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ email: 'Email not found' }); // Thay đổi thông báo cho phù hợp
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ password: 'Password incorrect' });
        }

        console.log("Attempting to find user with email:", email);
        if (!user) {
            console.log("No user found with email:", email);
        } else {
            console.log("User found, checking password...");
        }


        const payload = { id: user.id, name: user.name };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        // Use process.env.JWT_SECRET instead of 'secretKey'
        res.json({
            success: true,
            token: 'Bearer ' + token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});