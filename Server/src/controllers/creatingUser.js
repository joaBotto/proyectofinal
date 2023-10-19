const users = require("../models/user");

// const creatingUser = async (req, res) => {
//   const newUser = req.body;
//   try {
//     const userRegistred = await users.findOne({ email: newUser.email });
//     if (userRegistred) {
//       throw new Error("User already exists");
//     } else {
//       const userCreated = await users.create(newUser);
//       res.status(200).json({ message: "Registro exitoso", user: userCreated });
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Register error", message: error.message });
//   }
// };

//-------------------------Esto de aqui abajo es el que funciona el de arriba rompe--------


const creatingUser = async (newUser) => {
    const userRegistred = await users.findOne({ email: newUser.email });
    if (userRegistred) {
        throw new Error("User already exists");
      } else {
          const userCreated = await users.create(newUser);
          return userCreated;
        }
      };
      
      module.exports = creatingUser;