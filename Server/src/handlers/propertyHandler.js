const creatingProperty = require("../controllers/creatingProperty");
const getProperties = require("../controllers/getProperties");
const detailingProperty = require("../controllers/detailingProperty");


const getPropertiesHandler = async (req, res) => {
  try {
    const allProperties = await getProperties();
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
    };
    
    const propertyCreated = await creatingProperty(newProperty);
    return res.status(201).json(propertyCreated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getPropertyByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const property = await detailingProperty(id);
    res.status(200).json(property);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPropertiesHandler,
  creatingPropertyHandler,
  getPropertyByIdHandler,
};
