const { Router } = require("express");
const bookingsRouter = Router();
const {
	getAllBookingsHandler,
	getBookingByIdHandler,
	addBookingHandler,
	// deleteBookingHandler,
	// editBookingHandler,
} = require("../handlers/bookingsHandler");

bookingsRouter.get("/", getAllBookingsHandler);
bookingsRouter.get("/:id", getBookingByIdHandler);
bookingsRouter.post("/", addBookingHandler);
// bookingsRouter.delete("/:id", deleteBookingHandler);
// bookingsRouter.put("/:id", editBookingHandler);

module.exports = { bookingsRouter };
