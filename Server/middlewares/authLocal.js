const Users = require('../src/models/user')

const authUser = async (email, password, done) => {
  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    if (user.password !== password) {
      return done(null, false, { message: 'Invalid Password' });
    }

    return done(null, user, { message: 'Valid authentication' });
  } catch (err) {
    return done(err);
  }
}

module.exports = authUser;
