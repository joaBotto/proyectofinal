const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
	cardNumber: {
		type: String,
		required: true,
	},
	expirationDate: {
		type: String,
		required: true,
	},
	cvv: {
		type: String,
		required: true,
	},
});

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		/* required: true, */
		unique: true,
	},
	password: {
		type: String,
		/* required: true, */
	},
	name: {
		type: String,
		/* required: true, */
	},
	lastName: {
		type: String,
		/* required: true, */
	},
	image: {
		type: String,
	},
	country: {
		type: String,
		/* required: true, */
	},
	city: {
		type: String,
		/* required: true, */
	},
	address: {
		type: String,
		/* required: true, */
	},
	phoneNumber: {
		type: String,
		/* required: true, */
	},

	type: String,
	active: Boolean,
	role: String,

	savedProperties: [],

	properties: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Property",
		},
	],
	paymentInfo: paymentSchema,
	createdAt: {
		type: Date,
		default: Date.now,
	},

	bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
