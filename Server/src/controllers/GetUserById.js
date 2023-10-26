const Users = require('../models/user')

const getUserByIdHandler = async (id) => {
    
    
    const user = await Users.findById(id);
    
    return user;
}


module.exports = getUserByIdHandler