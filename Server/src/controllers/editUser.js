const Users = require('../models/user');

const editUser = async (user) => {
	const userId = user._id;
	const updateData = { ...user }; // Copia los datos del usuario para evitar modificar el objeto original

	// Elimina "_id" y "__v" del objeto de actualización para evitar problemas
	delete updateData._id;
	delete updateData.__v;

	// Verifica si "active" está presente en el objeto y actualízalo si es necesario
	if (user.hasOwnProperty('active')) {
		updateData.active = user.active;
	}

	const updatedUser = await Users.findByIdAndUpdate(userId, user, {
		new: true,
	});

	return updatedUser;
};

module.exports = editUser;
