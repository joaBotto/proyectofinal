function ensureAuthenticated(req, res, next) {
    console.log("ESTOY AUTENTICADO",req.user)
    if (req.isAuthenticated()) {
      return next();
    }
}
  
  module.exports = ensureAuthenticated;
  