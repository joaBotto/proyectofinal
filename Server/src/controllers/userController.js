const User = require('../models/user');

// ...

exports.deleteUserProperty = async (req, res) => {
  try {
    const userId = req.params.userId;
    const propertyId = req.params.propertyId;

    // Verifica si el usuario existe por su ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'El usuario no fue encontrado' });
    }

    // Verifica si el usuario es dueño de la propiedad
    const propertyIndex = user.properties.findIndex(
      (property) => property.toString() === propertyId
    );

    if (propertyIndex === -1) {
      return res.status(404).json({ error: 'La propiedad no pertenece al usuario' });
    }

    // Elimina la propiedad del array de propiedades del usuario
    user.properties.splice(propertyIndex, 1);

    // Guarda los cambios en la base de datos
    await user.save();

    res.json({ message: 'La propiedad fue eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
  }
};
