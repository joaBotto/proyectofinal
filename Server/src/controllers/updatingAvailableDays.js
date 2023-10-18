const Property = require("../models/property");

const updateAvailableDays = async (id, availableDays) => {
	try {
		const updatedProperty = await Property.findByIdAndUpdate(
			{ _id: id },
			{ $set: { availableDays } },
			{ new: true }
		);

		if (!updatedProperty) {
			throw new Error("Property days could not be updated");
		}

		console.log("Updated Property:", updatedProperty);
		return updatedProperty;
	} catch (error) {
		console.error("Error at editing properties days:", error);
		throw error;
	}
};

module.exports = updateAvailableDays;
