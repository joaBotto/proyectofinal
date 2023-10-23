const property = require('../models/property');
const Users = require('../models/user')

const removingProperty = async (id) => {
 const propertyRemove = await property.findByIdAndRemove({_id:id})
 if (propertyRemove) {
    return propertyRemove
 } else {
    throw new Error('The property does not exist')
 }   

}

module.exports = removingProperty