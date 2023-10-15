const Booking = require("../../models/booking");

const addNewBooking = async (newBooking) => {
	const bookingCreated = await Booking.create(newBooking);
	return bookingCreated;
};

module.exports = addNewBooking;
