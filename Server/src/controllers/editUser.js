const User = require("../models/user"); // Asegúrate de importar el modelo de usuario adecuado

const editUser = async (user) => {
  try {
    // Realiza la actualización de los datos del usuario
    const userEdited = await User.findOneAndUpdate(
      { _id: user._id }, // Filtra por el _id del usuario que deseas editar
      { $set: user }, // Establece los nuevos datos del usuario
      { new: true } // Esto evita que devuelva el documento original
    );

    return userEdited;
  } catch (error) {
    throw new Error("Error updating user in the database");
  }
};

module.exports = editUser;


/* const Users = require('../models/user')

const editUser = async (user) => {
 
    const userId = user._id;
    const updatedUser = await Users.findByIdAndUpdate(userId, user, { new: true })
  
return updatedUser
}

module.exports = editUser;

  */