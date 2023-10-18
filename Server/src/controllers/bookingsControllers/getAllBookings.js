const Booking = require("../../models/booking");

const getAllBookings = () => {
	const bookings = Booking.find();
	if (bookings) {
		return bookings;
	} else {
		throw new Error("No bookings to show");
	}
};

module.exports = getAllBookings;
