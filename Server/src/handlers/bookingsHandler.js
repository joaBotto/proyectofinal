const getAllBookings = require("../controllers/bookingsControllers/getAllBookings");
// const getBookings = require("../controllers/bookingsControllers/getBookings");
// const editBookings = require("../controllers/bookingsControllers/editBookings");
// const deleteBooking = require("../controllers/bookingsControllers/deleteBooking");
const addNewBooking = require("../controllers/bookingsControllers/addNewBooking");

const getAllBookingsHandler = async (req, res) => {
	try {
		const allBookings = await getAllBookings();
		return res.status(200).json(allBookings);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const addBookingHandler = async (req, res) => {
	try {
		if (!req.body || !Object.keys(req.body)) return res.sendStatus(401);
		const {
			startDate,
			endDate,
			owner,
			guest,
			property,
			totalDays,
			totalAmount,
			isPayed,
			transactionId,
			status,
		} = req.body;

		const newBooking = {
			startDate,
			endDate,
			owner,
			guest,
			property,
			totalDays,
			totalAmount,
			isPayed,
			transactionId,
			status,
		};
		const reservation = await addNewBooking(newBooking);
		return res.status(201).json(reservation);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllBookingsHandler,
	// getBookingByIdHandler,
	addBookingHandler,
	// deleteBookingHandler,
	// editBookingHandler,
};
