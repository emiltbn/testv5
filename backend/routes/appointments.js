const express = require('express');
const router = express.Router();
const { createAppointment, getAppointmentsByUser, deleteAppointment } = require('../controllers/appointmentController');

router.post('/', createAppointment);
router.get('/:userId', getAppointmentsByUser);
router.delete('/:id', deleteAppointment);

module.exports = router;