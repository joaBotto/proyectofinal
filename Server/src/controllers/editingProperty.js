const Properties = require("../models/property")


export const editingProperty = async (property) => {
try {
    const propertyEdited = await Properties.findOneAndUpdate(
        { _id: property._id },
        { $set: property },
        { new: true } // Esto evita que devuelva el documento original
      );
      return propertyEdited;
} catch (error) {
    throw new Error("Error updating database")
}
}

module.exports = editingProperty;