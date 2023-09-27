const property = require('../models/property');
const user = require('../models/user');

const detailingProperty = async (id) => {
   const property = property.findOne({id:id})
   const owner = await user.findOne({ properties: { $in: [id] } });
   const detailProperty = {
    ...property.toObject(),
    owner:owner.toObject()
   }
   return detailProperty
}

module.exports = detailingProperty;