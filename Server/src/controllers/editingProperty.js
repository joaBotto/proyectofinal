const property = require("../models/property")


const editingProperty = async (propertyForEdit) => {
try {
    const propertyEdited = await property.findOneAndUpdate(
        { _id: propertyForEdit._id },
        { $set: propertyForEdit },
        { new: true } // Esto evita que devuelva el documento original
      );
      return propertyEdited;
} catch (error) {
    throw new Error("Error updating database")
}
}

module.exports = editingProperty;