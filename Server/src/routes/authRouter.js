const { Router } = require("express");
const authRouter = Router();
const passport = require("passport");

authRouter.post("/login", (req,res,next)=>{
  console.log("soy req", req.body);
  next()
},
  passport.authenticate("local", {
    successRedirect:"http://localhost:3000/",
    failureRedirect: "http://localhost:3000/login",
  }),
    /* (req, res) => {
      console.log(req.user);
      res.redirect("/usuario");
    } */
);

/* authRouter.get("/usuario",(req, res)=>{
  console.log("soy req en usuario", req.user)
  res.status(200).json(req.user)
})
authRouter.get("/failure",(req, res)=>{
  console.log("soy req en failure", req.user)
  res.status(401).json(req.user)
}) */
module.exports = { authRouter };
