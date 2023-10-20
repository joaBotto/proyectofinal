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
  const user = {
    email:profile.emails[0].value,
    name:`${profile.name.givenName}`,
    lastName:`${profile.name.familyName}`,
    image:profile.photos[0].value
}
console.log("soy user de google", user)
let userRegister = await Users.findOne({ email:profile.emails[0].value});
if (!userRegister) {
  userRegister = await Users.create(user);
}
console.log("soy userRegister", userRegister)
done(null, userRegister)


} catch (error) {
  console.log(error)
  done(error, null)
}

  }
));

passport.serializeUser((userRegister, done) => {
	console.log('Serializando usuario:', userRegister);
	return done(null, userRegister._id);
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
