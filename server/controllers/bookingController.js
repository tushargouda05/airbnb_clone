const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Place = require('../models/Place');

// POST /bookings/create-booking   body: { place, checkIn, checkOut, name, phone }
exports.createBookings = async (req, res) => {
  try {
    const { place, name, phone } = req.body;
    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);

    if (!mongoose.isValidObjectId(place) || !name || !phone) {
      return res.status(400).json({ message: 'Place, name and phone are required' });
    }
    if (isNaN(checkIn) || isNaN(checkOut) || checkOut <= checkIn) {
      return res.status(400).json({ message: 'Please choose valid check-in and check-out dates' });
    }

    const placeDoc = await Place.findById(place);
    if (!placeDoc) return res.status(404).json({ message: 'Place not found' });

    // Reject overlapping bookings for the same place
    const clash = await Booking.findOne({
      place,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });
    if (clash) {
      return res.status(409).json({ message: 'These dates are already booked' });
    }

    const nights = Math.ceil((checkOut - checkIn) / (24 * 60 * 60 * 1000));
    const booking = await Booking.create({
      user: req.user._id,
      place,
      checkIn,
      checkOut,
      name,
      phone,
      price: placeDoc.price * nights, // calculated on the server
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /bookings/get-bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('place')
      .sort({ checkIn: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};