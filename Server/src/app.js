require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/index");

const passport = require('passport'); //La biblioteca de autenticación para Node.js.
const LocalStrategy = require ('passport-local').Strategy;
const authUser = require ('../middlewares/authLocal')
const User = require('../src/models/user')

const server = express();

const corsOptions = {
	origin: "http://localhost3000.com", // Solo permite este dominio
	methods: "GET, POST, OPTIONS, PUT, DELETE",
	allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept", // Solo permite estos encabezados
	credentials: true, // Permite enviar cookies
};

server.use(passport.initialize());
server.use(passport.session());
passport.use('local',new LocalStrategy( {
    usernameField: 'email', 
    passwordField: 'password'
  },(email, password, done)=>{
	authUser(email, password, done)
}))
passport.serializeUser((user, done) => {
	done(null, user._id);
  });
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
	  done(err, user);
	});
  });

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(passport.initialize());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/", routes);

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
