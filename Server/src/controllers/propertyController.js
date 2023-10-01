const Property = require('../models/Property');

// ...

exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const updatedPropertyData = req.body; // Datos actualizados en el cuerpo de la solicitud

    // Verifica si la propiedad existe por su ID
    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return res.status(404).json({ error: 'La propiedad no fue encontrada' });
    }

    // Actualiza la propiedad con los datos proporcionados
    existingProperty.title = updatedPropertyData.title;
    existingProperty.description = updatedPropertyData.description;
    existingProperty.price = updatedPropertyData.price;
    existingProperty.bedrooms = updatedPropertyData.bedrooms;
    existingProperty.bathrooms = updatedPropertyData.bathrooms;
    existingProperty.address = updatedPropertyData.address;
    existingProperty.availableDates = updatedPropertyData.availableDates;
    existingProperty.images = updatedPropertyData.images;

    // Guarda los cambios en la base de datos
    const updatedProperty = await existingProperty.save();

    res.json(updatedProperty); // Responde con los datos actualizados de la propiedad
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
  }
};
