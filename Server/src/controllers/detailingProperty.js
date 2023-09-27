const property = require('../models/property');
const user = require('../models/user');

/* const detailingProperty = async (id) => {
   const propertyData = property.findById(id)
   
   const owner = await user.findOne({ properties: { $in: [id] } });
   const detailProperty = {
    ...propertyData,
    owner:owner.toObject()
   }
   return detailProperty
} */

const detailingProperty = async (req, res) => {
   try {
       const { id } = req.params;
       const propertyData =  await property.findById(id);
       const owner = await user.findOne({ properties: { $in: [id] } })
       const detailProperty = {
         ...propertyData.toObject(),
         owner: owner.toObject()
      }
      
       console.log(detailProperty)
       res.status(200).json(detailProperty);
   } catch (error) {
       res.status(500).json({ error: error.message });
   }
};

module.exports = detailingProperty;