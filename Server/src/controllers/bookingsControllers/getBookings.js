const Booking = require("../../models/booking");

const getBookings = async (id) => {
	const booking = await Booking.findById(id);
	if (!booking) throw new Error("No such booking found");
	return booking;
};

module.exports = getBookings;
