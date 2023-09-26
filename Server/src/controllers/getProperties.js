const property = require("../models/property");

const getProperties = async () => {
  const properties = await property.find();
  if (properties) {
    return properties;
  } else {
    throw new Error("There are no properties");
  }
};

module.exports = getProperties;
