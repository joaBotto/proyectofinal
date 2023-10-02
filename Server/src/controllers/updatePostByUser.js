const Property = require('../models/property');

const updatePost = async (postId, updatedData) => {
  try {
    // Verifica si la publicación existe
    const property = await Property.findById(postId);

    if (!property) {
      throw new Error('Publicación no encontrada');
    }

    // Verifica si el usuario autenticado tiene permiso para actualizar la publicación
    // Puedes implementar tu lógica de autorización aquí, por ejemplo, comparando el ID del usuario autenticado con el ID del propietario de la publicación

    // Supongamos que el usuario tiene permiso para actualizar la publicación
    // Actualiza los datos de la publicación con los datos actualizados
    Object.assign(property, updatedData);
    await property.save();

    return property; // Devuelve la publicación actualizada
  } catch (error) {
    throw error; // Lanza el error para manejarlo en el manejador de errores
  }
};

module.exports = updatePost;
