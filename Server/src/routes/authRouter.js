const { Router } = require('express');
const authRouter = Router();
const passport = require('passport')
require("../../middlewares/google");

/* authRouter.get("/google",passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
})) */
router.get('/auth/google',
  passport.authenticate('auth-google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  })
);

// Ruta de callback para Google OAuth
router.get('/auth/google/callback',
  passport.authenticate('auth-google', {
    successRedirect: '/profile', // Redirige a la página de perfil en caso de éxito
    failureRedirect: '/login',   // Redirige a la página de inicio de sesión en caso de error
  })
);

// Ruta de perfil para mostrar los datos del usuario autenticado
router.get('/profile', (req, res) => {
  // `req.user` contiene el usuario autenticado (proporcionado por Passport.js)
  if (req.isAuthenticated()) {
    res.json(req.user); // Enviar el usuario autenticado al front-end
  } else {
    res.status(401).json({ error: 'Usuario no autenticado' });
  }
});
module.exports = { authRouter }; 