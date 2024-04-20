const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Đảm bảo rằng đường dẫn này đúng

// Function đầu tiên
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Không có token, truy cập bị từ chối' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
}

// Function thứ hai
function auth(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Truy cập bị từ chối.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Token không hợp lệ.');
    }
}




// Xuất ra cả hai function dưới dạng named exports
module.exports = { verifyToken, auth };