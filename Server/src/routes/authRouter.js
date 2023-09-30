const { Router } = require('express');
const authRouter = Router();
const passport = require('passport')

authRouter.post("/login", passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash: true
}))





module.exports = { authRouter }; 