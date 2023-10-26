const cron = require("node-cron");
const nodemailer = require("nodemailer");
const booking = require("../models/booking.js");
const SendEmail = require("../../middlewares/SendEmail");

cron.schedule("00 23 * * *", async () => { // minutos-hora
  try {
    let currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    currentDate = `${day}-${month}-${year}`;

    const bookings = await booking.find({ endDate: currentDate });
    for (const booking of bookings) {
      const reviewLink = `http://localhost:3000/reviews/${booking._id}`; 
  // console.log("SOY EL MAIL",booking.guest.email)
  // console.log("SOY EL ID DE BOOKING", booking._id)
      const mailOptions = {
        from: process.env.EMAIL,
        to: `${booking.guest.email}`,
        subject: "¡Gracias por hospedarte con nosotros!",
        html: `<p>Deja tu revisión sobre tu estadía en nuestro sitio haciendo clic en el siguiente enlace: <a href="${reviewLink}">Deja tu revisión</a></p>`,
      };
  
      await new Promise((resolve) => setTimeout(resolve, 60000)); 
      await SendEmail(mailOptions);
    }

  } catch (error) {
    console.error("Error en la tarea cron:", error);
  }
});
