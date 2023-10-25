const { Router } = require("express");
const mailsRouter = Router();
const sendEmail = require("../../middlewares/SendEmail")

mailsRouter.post("/login", (req, res) => {
    const { email } = req.body;
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Inmuebles 360 --> Successfully register",
        text: "¡Thanks for register on Inmuebles360! Your account is active now, u can view our properties and find one that suits you :)",
      };  
    sendEmail(mailOptions);
    res.status(200).json({
      message: "Registered user successfully!",
    });
  });


  module.exports = mailsRouter
  