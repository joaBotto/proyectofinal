const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");

/* authRouter.post("/login", passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
}, (req, res)=> {
   
    console.log("req.user después de autenticación:", req.user);
    // res.json({ user: req.user });

})) */
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" }); // Autenticación fallida
    }
    req.login(user, (err) => {
      // Guardar al usuario en sesión
      if (err) {
        return next(err);
      }
      // Autenticación exitosa, respondemos con el usuario autenticado
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

module.exports = { authRouter };
