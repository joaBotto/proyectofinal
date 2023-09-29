const Users = require('../src/models/user');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bcrypt = require('bcrypt');



passport.use("auth-google",
  new GoogleStrategy({
    clientID: "394324508634-dekdd0gut3m661r1krmphogn2ncsqgg9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const email = profile.emails[0].value; // Obtener el correo electrónico

    // Verificar si el usuario ya existe en la base de datos
    Users.findOne({ email: email }, function(err, existingUser) {
      if (err) {
        return cb(err, false); // Manejar errores y fallas de autenticación
      }

      // Si el usuario ya existe, retornar el usuario existente
      if (existingUser) {
        return cb(null, existingUser); // Autenticación exitosa
      } else {
        // Si el usuario no existe, generar una contraseña aleatoria y crear un nuevo usuario
        const randomPassword = Math.random().toString(36).slice(-8); // Generar una cadena de 8 caracteres aleatorios
        const saltRounds = 12;

        // Hash de la contraseña antes de almacenarla en la base de datos
        bcrypt.hash(randomPassword, saltRounds, function(err, hashedPassword) {
          if (err) {
            return cb(err, false); // Manejar errores y fallas de autenticación
          }

          // Crea un nuevo usuario en la base de datos con el correo y la contraseña generada
          Users.create({
            email: email,
            password: hashedPassword // Almacena la contraseña hasheada
          }, function (err, newUser) {
            if (err) {
              return cb(err, false); // Manejar errores y fallas de autenticación
            }

            // Retorna el usuario creado
            return cb(null, newUser); // Autenticación exitosa
          });
        });
      }
    });
  }
));
