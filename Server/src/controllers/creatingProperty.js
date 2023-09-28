const property = require("../models/property");
const users = require("../models/user");

const creatingProperty = async (newProperty) => {
	const propertyRegistred = await property.findOne({
		"address.street": newProperty.address.street,
	});
	if (propertyRegistred) {
		throw new Error("The property has already been published");
	} else {
		const propertyCreated = await property.create(newProperty);
		await users.findByIdAndUpdate(newProperty.owner, {
			$push: { properties: propertyCreated._id },
		});
		return propertyCreated;
	}
};

module.exports = creatingProperty;
