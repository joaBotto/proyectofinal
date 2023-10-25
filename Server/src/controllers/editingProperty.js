const property = require("../models/property");

const editingProperty = async (propertyForEdit) => {
	try {
		const propertyEdited = await property.findOneAndUpdate(
			{ _id: propertyForEdit._id },
			{
				$set: {
					...propertyForEdit,
					reviews: propertyForEdit.reviews,
				},
			},
			{ new: true }
		);
		console.log("property Edited", propertyEdited);
		return propertyEdited;
	} catch (error) {
		throw new Error("Error updating database");
	}
};

module.exports = editingProperty;
