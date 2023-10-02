const Users = require('../models/user')

const getUsers = (email) => {
    const user = Users.findOne({email:email});
    return user;
}

module.exports = getUsers;