const Users = require('../src/models/user');
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
/* const bcrypt = require('bcrypt'); */



passport.use("auth-google",
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback:true
  },
  async function (req, accessToken, refreshToken, profile, done) {
try {
  const userGoogle = {
    email:profile.emails[0].value,
    name:`${profile.name.givenName}`,
    lastName:`${profile.name.familyName}`,
    image:profile.photos[0].value,
    role:"user",
    active: true
}
console.log("soy user de google", userGoogle)
let user = await Users.findOne({ email:profile.emails[0].value});

if (!user) {
  user = await Users.create(userGoogle);
}

if (user.active === false) {
  done(null, false)
}

console.log("soy userRegister", user)
done(null, user)


} catch (error) {
  console.log(error)
  done(error, null)
}

  }
));

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
