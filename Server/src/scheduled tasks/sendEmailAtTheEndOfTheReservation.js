const cron = require('node-cron');
const nodemailer = require('nodemailer');
const booking = require('../models/booking.js')


const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  })

cron.schedule('0 0 * * *', async () => {
  try {
    
    const currentDate = new Date();    
    const bookings = await booking.find({ endDate: currentDate });

    bookings.forEach(async (booking) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: booking.guest.email,
        subject: '¡Gracias por hospedarte con nosotros!',
        text: 'Deja tu revisión sobre tu estadía en nuestro sitio.',
        /* ACA HAY QUE ENVIARLE LA URL PARA QUE DEJE SU OPINION */
      };

      await transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${booking.guest.email}`);
    });
  } catch (error) {
    console.error('Error en la tarea cron:', error);
  }
});
