const Users = require('../models/user')

const getLogin = async (email, password) => {
    const user = await Users.findOne({email:email})
    if (!user) {
        throw new Error("Invalid email")
    }
    const access = false
    if (user.password === password) {
        access = true
    }
    return access
}

module.exports = getLogin;