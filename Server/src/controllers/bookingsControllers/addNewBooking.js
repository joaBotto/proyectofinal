const Booking = require("../../models/booking");

const addNewBooking = async (newBooking) => {
	const bookingCreated = await Booking.create(newBooking);
	console.log(bookingCreated);
	return bookingCreated;
};

module.exports = addNewBooking;
