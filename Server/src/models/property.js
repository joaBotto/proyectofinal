const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	imageUrl: {
		type: String,
		required: true,
	},
});

const reviewsSchema = new mongoose.Schema({
	description: {
		type: String,
	},
	calification: {
		type: Number,
	},
	guestName: {
		type: String,
	},
	guestId: {
		type: String,
	},
	guestImage: {
		type: String,
	},
});

const propertySchema = new mongoose.Schema({

	title: {
		type: String,
		// required: true,
	},
	description: String,
	price: {
		type: Number,
	},
	address: {
		street: String,
		city: String,
		state: String,
		zipcode: String,
	},
	bedrooms: Number,
	bathrooms: Number,
	availableDays: [Date],
	images: [imageSchema],


	type: String,
	amenities: {
		covered_area: Number,
		garage: Boolean,
		antique: Number,
		grill: Boolean,
		heating: Boolean,
	},
	additional: {
		swimmingpool: Boolean,
		terrace: Boolean,
		dining_room: Boolean,
		washing_machine: Boolean,
		internet_wifi: Boolean,
		refrigerator: Boolean,
		microwave: Boolean,
		coffee_maker: Boolean,
		patio: Boolean,
		balcony_patio: Boolean,
	},
	active: Boolean,
	reviews: [reviewsSchema],
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
