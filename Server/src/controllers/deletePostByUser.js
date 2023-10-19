const Property = require('../models/property');

const deletePost = async(postId) => {
// Verifica si la publicación existe
const property = await Property.findById(postId);
if (!property) {
    return null; // Devuelve null si la publicación no se encuentra
}

// Supongamos que el usuario tiene permiso para eliminar la publicación, entonces la eliminamos
await Property.findByIdAndDelete(postId);

return property; // Devuelve la publicación eliminada
}

module.exports = deletePost