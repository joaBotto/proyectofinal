const { Router } = require('express');
const authRouter = Router();
const passport = require('passport')
require("../../middlewares/google");

authRouter.get("/google",passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false
}))
// ME FALTA AVERIGUAR COMO MANDAR EL USER NUEVO Y LAS VARIABLES DE ENTORNO

module.exports = { authRouter }; 