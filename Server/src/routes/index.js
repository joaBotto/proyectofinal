const { Router } = require("express");
const router = Router();
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig.js");
const fs = require("fs").promises;
const path = require("path");
const nodemailer = require("nodemailer");

const { propertiesRouter } = require("./propertiesRouter");
const { usersRouter } = require("./usersRouter");
const { authRouter } = require("./authRouter");
const { bookingsRouter } = require("./bookingsRouter.js");


const storage = multer.memoryStorage(); // Almacenamiento en memoria (puedes cambiarlo para guardar en disco si lo prefieres)
const upload = multer({
  storage: storage, // Utiliza el almacenamiento en memoria
  limits: { fileSize: 3840 * 2160 }, // Límite de tamaño del archivo en bytes (1MB en este caso)
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("Recibida solicitud de carga de imagen");
    if (!req.file) {
      console.log("No se proporcionó ninguna imagen."); // Agrega un log si no se proporciona ninguna imagen
      return res
        .status(400)
        .json({ message: "No se proporcionó ninguna imagen." });
    }
    // Guarda el archivo temporalmente en el sistema de archivos local
    let temporaryFilePath;
    if (process.platform === "win32") {
      // Si el sistema operativo es Windows
      temporaryFilePath = path.join(process.env.TEMP, req.file.originalname);
    } else {
      // Si el sistema operativo no es Windows (por ejemplo, Linux o macOS)
      temporaryFilePath = `/tmp/${req.file.originalname}`;
    }

    await fs.writeFile(temporaryFilePath, req.file.buffer);

    const result = await cloudinary.uploader.upload(temporaryFilePath, {
      folder: "c57629ef1b093e38460ef8101c94f36653",
    });

    await fs.unlink(temporaryFilePath);
    console.log("Imagen cargada con éxito:", result.secure_url); // Agrega un log si la imagen se carga con éxito
    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    return res.status(500).json({ message: "Error al cargar la imagen." });
  }
});

router.use("/auth", authRouter);
router.use("/properties", propertiesRouter); // ruta_backend/properties -> Te lleva al router de propiedades
router.use("/users", usersRouter); // ruta_backend/users -> Te lleva al router de users
router.use("/bookings", bookingsRouter);




//!--------------- ruta para envio de email -------------------------------------
router.post("/auth/login/:email/code", (req, res) => {
  const { email } = req.params;
  const user = {
    email,
    active: true,
  };

  enviarCorreoConfirmacion(user.email);
  res.status(200).json({
    message: "Registered user successfully! Your account is active!",
  });
});

async function enviarCorreoConfirmacion(email) {
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
    subject: "Successfully register",
    body: "¡Thanks for register on Inmuebles360!",
  };
  try {
    console.log(process.env.EMAIL);
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado: ", info.response);
  } catch (error) {
    console.log("Error al enviar el correo de confirmación: ", error);
  }
}
//!--------------------------------------------------------------------------------
module.exports = router;
