const Property = require("../models/property");

const unorm = require("unorm");

const getSearchedProperties = async (search) => {
	try {
		const normalizedSearch = unorm.nfd(search).replace(/[\u0300-\u036f]/g, "");

		const searchQuery = normalizedSearch.replace(/\s/g, "\\s*");

		const regex = new RegExp(searchQuery, "i");
		const searchedProperty = await Property.find({
			$or: [{ title: regex }, { "address.state": regex }, { type: regex }],
		});

		if (searchedProperty.length === 0) {
			return { searchedProperty, noResults: true };
		} else {
			return { searchedProperty, noResults: false };
		}
	} catch (error) {
		console.error("Error fetching searched properties:", error);
		throw error;
	}
};

module.exports = getSearchedProperties;
