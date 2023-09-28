import Users from '../src/models/user'
import { use } from 'passport';
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import bcrypt from 'bcrypt';



use("auth-google",
    new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
    const email = profile.emails[0].value; // Obtener el correo electrónico
  
    // Verificar si el usuario ya existe en la base de datos
    Users.findOne({ email: email }, function(err, existingUser) {
      if (err) {
        return res.status(500).json({error:"Error in user search"});
      }
  
      // Si el usuario ya existe, simplemente retornar el usuario existente
      if (existingUser) {
        return res.status(200).json(existingUser);
      } else {
  
      // Si el usuario no existe, generar una contraseña aleatoria y crear un nuevo usuario
      const randomPassword = Math.random().toString(36).slice(-8); // Genera una cadena de 8 caracteres aleatorios
      const saltRounds = 12;

      // Hash de la contraseña antes de almacenarla en la base de datos
      bcrypt.hash(randomPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
          return res.status(500).json({error:"Error hashing password"});
        }
  
        // Crea un nuevo usuario en la base de datos con el correo y la contraseña generada
        Users.create({
          email: email,
          password: hashedPassword // Almacena la contraseña hasheada
        }, function (err, newUser) {
          if (err) {
            return res.status(500).json({error:error.message})
          }
        
          // Retorna el usuario creado
          return res.status(201).json(newUser)
        });
      });
    }
    });
  }
));