const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");


authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

module.exports = { authRouter };
