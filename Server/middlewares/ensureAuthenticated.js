function ensureAuthenticated(req, res, next) {
    console.log("soy RODRIGO",req.user)
    if (req.isAuthenticated()) {
      return next(); // El usuario está autenticado, permite continuar.
    }
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión o muestra un mensaje de error.
   /*  res.redirect("/login"); */ // Reemplaza "/login" con la URL de tu página de inicio de sesión.
   console.log("esto esta mal")
  }
  
  module.exports = ensureAuthenticated;
  