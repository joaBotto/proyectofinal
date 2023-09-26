const property = require('../models/property');


const creatingProperty = async (newProperty) => {
    const propertyRegistred = await property.findOne({address:newProperty.address})
    if (propertyRegistred) {
        throw new Error("the property has already been published")
    } else {
        const propertyCreated = await property.create(newProperty)
        return propertyCreated
    }

};

module.exports = creatingProperty