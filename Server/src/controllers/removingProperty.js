const property = require('../models/property');
const Users = require('../models/user')

const removingProperty = async (id) => {
  const propertyRemove = await property.findByIdAndRemove({ _id: id });

  if (propertyRemove) {
    const user = await Users.findOne({ properties: id });

    if (!user) {
      return propertyRemove;
    } else {
      user.properties = user.properties.filter(propId => propId.toString() !== id.toString());
      await user.save(); 
      return propertyRemove;
    }
  } else {
    throw new Error('The property does not exist');
  }
};


module.exports = removingProperty