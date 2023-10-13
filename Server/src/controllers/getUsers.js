const Users = require('../models/user')

const getAllUsers = async () => {
    const allUsers = await Users.find().lean();
	if (allUsers) {
		return allUsers;
	} else {
		throw new Error("There are no users");
	}
}
module.exports = getAllUsers;