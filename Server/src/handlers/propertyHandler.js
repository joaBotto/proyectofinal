const creatingProperty = require("../controllers/creatingProperty");
const getProperties = require("../controllers/getProperties");
const getSearchedProperties = require("../controllers/getSearchPropertiesByQuery");
const detailingProperty = require("../controllers/detailingProperty");
const editingProperty = require("../controllers/editingProperty");
const updatingAvailableDays = require("../controllers/updatingAvailableDays");

const getPropertiesHandler = async (req, res) => {
	const { search } = req.query;
	console.log(search);
	try {
		const allProperties = search
			? await getSearchedProperties(search)
			: await getProperties();
		return res.status(200).json(allProperties);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const creatingPropertyHandler = async (req, res) => {
	try {
		const {
			title,
			description,
			price,
			additional,
			amenities,
			type,
			address,
			bedrooms,
			bathrooms,
			availableDays,
			images,
			owner,
		} = req.body;

		const newProperty = {
			title,
			description,
			price,
			additional,
			amenities,
			type,
			address,
			bedrooms,
			bathrooms,
			availableDays,
			images,
			owner,
			active: true,
		};

		const propertyCreated = await creatingProperty(newProperty);
		return res.status(201).json(propertyCreated);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getPropertyByIdHandler = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	try {
		const property = await detailingProperty(id);
		res.status(200).json(property);
	} catch (error) {
		console.log("soy el error", error.message);
		return res.status(500).json({ error: error.message });
	}
};

const editPropertyAvailability = async (req, res) => {
	const { id } = req.params;
	const { availableDays } = req.body;
	console.log(id, req.body);
	try {
		const updatedProperty = await updatingAvailableDays(id, availableDays);
		if (!updatedProperty) throw Error("Property days could not be updated");
		return res.status(200).json(updatedProperty);
	} catch (error) {
		return res.status(400).send({ message: error.message });
	}
};

const editPropertyHandler = async (req, res) => {
	try {
		const {
			title,
			description,
			address,
			bedrooms,
			bathrooms,
			price,
			type,
			availableDays,
			images,
			amenities,
			additional,
			active,
			owner,
			_id,
			__v,
		} = req.body;
		const propertyForEdit = {
			title,
			description,
			address,
			bedrooms,
			bathrooms,
			price,
			type,
			availableDays,
			images,
			amenities,
			additional,
			active,
			owner,
			_id,
			__v,
		};
		const propertyEdited = await editingProperty(propertyForEdit);
		console.log("retorno", propertyEdited);
		return res.status(200).json(propertyEdited);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getPropertiesHandler,
	creatingPropertyHandler,
	getPropertyByIdHandler,
	editPropertyHandler,
	editPropertyAvailability,
};
