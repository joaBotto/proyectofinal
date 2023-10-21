const Property = require("../models/property");

const getSearchedProperties = async (search) => {
	try {
		const regex = new RegExp(search, "i");
		const searchedProperty = await Property.find({
			$or: [{ title: regex }, { "address.city": regex }],
		});
		return searchedProperty;
	} catch (error) {
		console.error("Error fetching searched properties:", error);
		throw error;
	}
};

module.exports = getSearchedProperties;
