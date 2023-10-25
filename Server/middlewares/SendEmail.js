const nodemailer = require('nodemailer')


const SendEmail = async (mailOptions) => {

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  
    try {
      console.log(process.env.EMAIL);
      const info = await transporter.sendMail(mailOptions);
      console.log("Correo de confirmación enviado: ", info.response);
    } catch (error) {
      console.log("Error al enviar el correo de confirmación: ", error);
    }
  }

  module.exports = SendEmail