const User = require('../models/user');
const Property = require('../models/property');

const getUserPosts = async (userId) => {
    try {
        // Busca al usuario en la base de datos por su ID
        const user = await User.findById(userId);
    
        if (!user) {
          return { error: 'Usuario no encontrado' };
        }
    
        // Obtiene las propiedades asociadas al usuario
        const userPropertyIds = user.properties;
    
        // Busca las propiedades en la base de datos por los IDs asociados al usuario
        const userProperties = await Property.find({ _id: { $in: userPropertyIds } });
    
        return userProperties;
      } catch (error) {
        console.error('Error al cargar las publicaciones del usuario:', error);
        return { error: 'Error interno del servidor' };
      }
}

module.exports = getUserPosts;