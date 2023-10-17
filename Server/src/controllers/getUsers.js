const Users = require('../models/user')

const getAllUsers = async () => {

	try {
		const allUsers = await Users.find().lean();
		console.log(allUsers)
	if (allUsers) {
		return allUsers;
	} else {
		throw new Error("There are no users");
	}	
	} catch (error) {
		throw new Error("Error fetching users: " + error.message)
	}
    
}
module.exports = getAllUsers;