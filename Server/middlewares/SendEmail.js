const nodemailer = require('nodemailer')


const SendEmail = async (email) => {

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Inmuebles 360 --> Successfully register",
      text: "¡Thanks for register on Inmuebles360! Your account is active now, u can view our properties and find one that suits you :)",
    };
    try {
      console.log(process.env.EMAIL);
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo de confirmación enviado: ", info.response);
    } catch (error) {
      console.log("Error al enviar el correo de confirmación: ", error);
    }
  }

  module.exports = SendEmail