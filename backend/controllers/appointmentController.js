const Appointment = require('../models/Appointment'); // Đảm bảo rằng đường dẫn là đúng


// Tạo lịch hẹn mới
exports.createAppointment = async(req, res) => {
    const appointment = new Appointment({
        date: req.body.date,
        time: req.body.time,
        userId: req.body.userId
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Xem tất cả lịch hẹn của một người dùng
exports.getAppointmentsByUser = async(req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.params.userId });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Xóa lịch hẹn
exports.deleteAppointment = async(req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lịch hẹn đã được xóa' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};