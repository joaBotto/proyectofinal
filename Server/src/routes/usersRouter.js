const { Router } = require("express");
const usersRouter = Router();
const creatingUser = require("../controllers/creatingUser");
const { createUserHandler } = require("../handlers/userHandler");

// CREANDO USUARIO

//POST a banckend_ruta/users
usersRouter.post("/", createUserHandler);

// usersRouter.post("/", async (req, res) => {
// 	try {
// 		const {
// 			email,
// 			password,
// 			name,
// 			lastName,
// 			country,
// 			city,
// 			address,
// 			phoneNumber,
// 		} = req.body;
// 		const user = {
// 			email,
// 			password,
// 			name,
// 			lastName,
// 			country,
// 			city,
// 			address,
// 			phoneNumber,
// 		};
// 		if (
// 			email &&
// 			password &&
// 			name &&
// 			lastName &&
// 			country &&
// 			city &&
// 			address &&
// 			phoneNumber
// 		) {
// 			const newUser = await creatingUser(user);
// 			return res.status(201).json(newUser);
// 		} else {
// 			return res.status(400).json({ error: "missing data" });
// 		}
// 	} catch (error) {
// 		return res.status(500).json({ error: error.message });
// 	}
// });

module.exports = usersRouter;
