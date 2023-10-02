const Users = require('../models/user')

const editUser = async (user) => {
 
    const userId = user._id;
    const updatedUser = await Users.findByIdAndUpdate(userId, user, { new: true })
  
return updatedUser
}

module.exports = editUser;

 