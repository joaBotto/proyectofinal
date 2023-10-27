const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
	imageUrl: {
		type: String,
		required: true,
	},
});

const propertySchema = new mongoose.Schema({
	title: {
		type: String,
		/* required: true, */
	},
	description: String,
	price: {
		type: Number,
	},
	address: {
		street: String,
		locality: String,
		city: String,
		state: String,
		zipcode: String,
		lat: Number,
		lng: Number,
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
	reviews: [],
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
