const Booking = require("../../models/booking");
const User = require("../../models/user");

const addNewBooking = async (newBooking) => {
	const bookingCreated = await Booking.create(newBooking);
	console.log(bookingCreated);
	const guestId = newBooking.guest._id;
	const bookingId = bookingCreated._id;
	await User.findByIdAndUpdate(guestId, {
		$push: { bookings: bookingId },
	});
	return bookingCreated;
};

module.exports = addNewBooking;
