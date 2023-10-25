const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");
const ensureAuthenticated = require('../../middlewares/ensureAuthenticated')


authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Iniciar sesión y guardar la información del usuario en la sesión
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      console.log("Sesión guardada con éxito")
      // Autenticación exitosa, devuelve los datos del usuario como JSON
      res.json({ user });
    });
  })(req, res, next);
});


/* authRouter.post("/login", passport.authenticate("local", {
  failureRedirect: "http://localhost:3000/login",
}), (req,res ) => {
  console.log("La autenticación tuvo éxito");
  console.log("Usuario autenticado:", req.user);
  res.redirect("http://localhost:3000");
}); */


authRouter.get("/google", passport.authenticate("auth-google", {scope:['profile','email']}))

authRouter.get("/google/callback", passport.authenticate("auth-google", {
  failureRedirect: "http://localhost:3000/login"
}), (req, res) => {
  console.log("La autenticación tuvo éxito");
  console.log("Usuario autenticado:", req.user);
  res.redirect("http://localhost:3000");
});

authRouter.get("/user", ensureAuthenticated, (req,res) => {
  const user = req.user
  console.log(user)
  res.status(200).json({user})
})

authRouter.post("/login", passport.authenticate("local", {
  successRedirect: "http://localhost:3000", // Redirige en caso de autenticación exitosa
  failureRedirect: "http://localhost:3000/login",
}));


/* router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al cerrar la sesión");
      }
      return res.status(200).send("La sesión se ha cerrado correctamente");
    });
  } else {
    return res.status(401).send("No estás autenticado");
  }
}); */


module.exports = { authRouter };
