const Users = require("../src/models/user");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy(
    {
			usernameField: 'email',
			passwordField: 'password',
		},
    async (email, password, done) => {
      try {
        console.log(email, password)
        const user = await Users.findOne({ email: email });
        if (!user) {
          return done(null, false);
        }

        if (user.password !== password) {
          return done(null, false);
        }

        console.log("soy user en authLocal", user);
        return done(null, user);
      } catch (err) {
        console.log("soy err en authlocal", err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
	console.log('Serializando usuario:', user);
	return done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
	console.log('Deserializando usuario por ID:', _id);
	try {
		const user = await Users.findById(_id);
		if (!user) {
			console.log('Usuario no encontrado.');
			return done(null, false);
		}
		console.log('Usuario deserializado:', user);
		return done(null, user);
	} catch (err) {
		console.log('error en la deserializacion');
		return done(err, null);
	}
});