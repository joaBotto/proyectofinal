//aca importar los controllers ya hechos, y hacer las funciones handlers de cada peticion, con async await + try catch
const creatingUser = require("../controllers/creatingUser");
const getUsers = require('../controllers/getUsers');
const editUser = require('../controllers/editUser')
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
      image,
      active:true,
      role:"user"
    };

    console.log("Recibida solicitud para crear usuario:", user);

    if (
      email &&
      password &&
      name &&
      lastName &&
      country &&
      city &&
      address &&
      phoneNumber&&
      image
    ) {
      // Sube la imagen a Cloudinary primero
      if (image) {
        const cloudinaryResponse = await uploadImageToCloudinary(image); // Asegúrate de tener la función de subida
        console.log("Respuesta de Cloudinary:", cloudinaryResponse);

        if (cloudinaryResponse.error) {
          // Si hay un error al subir la imagen, responde con el error
          console.error("Error al cargar la imagen en Cloudinary:", cloudinaryResponse.error);
          return res.status(500).json({ error: "Error al cargar la imagen en Cloudinary" });
        }

        // Si la subida fue exitosa, actualiza el objeto de usuario con la URL de la imagen
        user.image = cloudinaryResponse.secure_url;
      }

      // Después de manejar la imagen, procede con la creación del usuario
      const newUser = await creatingUser(user);
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

// const createUserHandler = async (req, res) => {
//   try {
//     const {
//       email,
//       password,
//       name,
//       lastName,
//       image,
//       country,
//       city,
//       address,
//       phoneNumber,
//     } = req.body;
//     const user = {
//       email,
//       password,
//       name,
//       lastName,
//       image,
//       country,
//       city,
//       address,
//       phoneNumber,
//     };
//     console.log("Recibida solicitud para crear usuario:", user); // Agrega este registro

//     if (
//       email &&
//       password &&
//       name &&
//       lastName &&
//       country &&
//       city &&
//       address &&
//       phoneNumber
//     ) {
//       const newUser = await creatingUser(user);
//       console.log("Usuario creado con éxito:", newUser);
//       return res.status(201).json(newUser);
//     } else {
//       console.error("Falta información en la solicitud.");
//       return res.status(400).json({ error: "missing data" });
//     }
//   } catch (error) {
//     console.error("Error en la creación de usuario:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };


const getUsersHandlers = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await getUsers(email);
    if (user) {
      return res.status(200).json(user);
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
      image,
			country,
			city,
			address,
			phoneNumber,
			properties, 
			createdAt,
			__v
		 } = req.body;
		 const user = {
			_id,
			email,
			password,
			name,
			lastName,
      image,
			country,
			city,
			address,
			phoneNumber,
			properties, 
			createdAt,
			__v
		 }
		
		const userEdited = await editUser(user);
		return res.status(200).json(userEdited)
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

module.exports = { createUserHandler, getUsersHandlers, editUserHandler };
