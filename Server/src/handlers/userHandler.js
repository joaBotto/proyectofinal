//aca importar los controllers ya hechos, y hacer las funciones handlers de cada peticion, con async await + try catch
const creatingUser = require("../controllers/creatingUser");
const getAllUsers = require("../controllers/getUsers");
const editUser = require("../controllers/editUser");
// const { enviarCorreoConfirmacion } = require("../routes/index");

const createUserHandler = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      lastName,
      image,
      country,
      city,
      address,
      phoneNumber,
    } = req.body;
    const user = {
      email,
      password,
      name,
      lastName,
      image,
      country,
      city,
      address,
      phoneNumber,
      active:true
    };
    console.log("Recibida solicitud para crear usuario:", user);
    if (
      email /* &&
      password &&
      name &&
      lastName &&
      country &&
      city &&
      address &&
      phoneNumber &&
      image */
    ) {
      const newUser = await creatingUser(user);
      // await enviarCorreoConfirmacion(newUser.email);
      console.log("Usuario creado con éxito:", newUser);
      return res.status(201).json(newUser);
    } else {
      console.error("Falta información en la solicitud.");
      return res.status(400).json({ error: "missing data" });
    }
  } catch (error) {
    console.error("Error en la creación de usuario:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getAllUsersHandlers = async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    console.log("soy allusers", allUsers);
    if (allUsers) {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editUserHandler = async (req, res) => {
  try {
    const {
      _id,
      email,
      password,
      name,
      lastName,
      images,
      savedProperties,
      country,
      city,
      address,
      phoneNumber,
      properties,
      active,
      role,
      createdAt,
      __v,
    } = req.body;
    const user = {
      _id,
      email,
      password,
      name,
      lastName,
      images,
      savedProperties,
      country,
      city,
      address,
      phoneNumber,
      properties,
      active,
      role,
      createdAt,
      __v,
    };
    console.log("soysaveeeehandler", savedProperties);
    console.log("soyuserhandler", user);
    const userEdited = await editUser(user);
    console.log("soyuserEditedxd", userEdited);
    return res.status(200).json(userEdited);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUserHandler, getAllUsersHandlers, editUserHandler };
