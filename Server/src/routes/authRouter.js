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

module.exports = { authRouter }; 