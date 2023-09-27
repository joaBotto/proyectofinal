//aca importar los controllers ya hechos, y hacer las funciones handlers de cada peticion, con async await + try catch
const creatingUser = require("../controllers/creatingUser");

const createUserHandler = async (req, res) => {
	try {
		const {
			email,
			password,
			name,
			lastName,
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
			country,
			city,
			address,
			phoneNumber,
		};
		if (
			email &&
			password &&
			name &&
			lastName &&
			country &&
			city &&
			address &&
			phoneNumber
		) {
			const newUser = await creatingUser(user);
			return res.status(201).json(newUser);
		} else {
			return res.status(400).json({ error: "missing data" });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = { createUserHandler };
