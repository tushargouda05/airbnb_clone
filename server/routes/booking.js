const express = require("express");
const router = express.Router();
const {isLoggedIn} = require('../middlewares/user');


const {
    createBookings,
    getBookings,
}=require('../controllers/bookingController');

router.route('/create-booking').post(isLoggedIn, createBookings);
router.route('/get-bookings').get(isLoggedIn, getBookings);

module.exports = router;