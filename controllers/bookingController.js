const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
    try {
        const { name, email, phone, service, date, message } = req.body;
        
        const newBooking = new Booking({
            name,
            email,
            phone,
            service,
            date,
            message
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, data: savedBooking });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getBookings };
