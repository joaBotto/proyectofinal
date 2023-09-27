const property = require("../models/property");
const user = require("../models/user");

const detailingProperty = async (id) => {

  const propertyData = await property.findById(id);
  const owner = await user.findOne({ properties: { $in: [id] } });
  const detailProperty = {
    ...propertyData.toObject(),
    owner: owner.toObject(),
  };
  return detailProperty;
};

module.exports = detailingProperty;
