require('dotenv').config({ path: 'key.env' });
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');

const app = express(); // Khai báo app trước khi sử dụng

const path = require('path');



const PORT = process.env.PORT || 4000;

app.use(express.static('frontend'));
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dang-ky.html'));
});

app.use(express.static('frontend'));
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dang-nhap.html'));
});

// Middleware
app.use(cors({
    origin: 'http://localhost:{port_frontend}', // Thay thế {port_frontend} bằng port thực tế của frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json()); // Đảm bảo sử dụng bodyParser.json() hoặc express.json()
app.use(express.json());
app.use(passport.initialize()); // Khởi tạo passport

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

// Routes
app.use('/api/users', userRoutes); // Đảm bảo đặt route sau các middleware
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/posts', require('./routes/posts'));



app.get('/', (req, res) => {
    res.send('Backend chay duoc roi');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Gọi chiến lược xác thực
require('./config/localStrategy')(passport);
require('./config/jwtStrategy')(passport);