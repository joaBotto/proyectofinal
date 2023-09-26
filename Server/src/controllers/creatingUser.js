const users = require('../models/user');

const creatingUser = async (newUser) => {
    const userRegistred = await users.findOne({email:newUser.email})
    if (userRegistred) {
        throw new Error("User already exists")
    } else {
        const userCreated = await users.create(newUser)
        return userCreated
    }

}

module.exports = creatingUser;
