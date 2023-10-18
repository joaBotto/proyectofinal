const { Router } = require("express");
const router = Router();
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig.js");
const fs = require("fs").promises;
const path = require("path");
//!-------------------------
const nodemailer = require("nodemailer");
//!-------------------------

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

router.get("/logout", (req, res) => {
	if (req.isAuthenticated()) {
		req.session.destroy((err) => {
			if (err) {
				console.error(err);
				return res.status(500).send("Error al cerrar la sesión");
			}
			return res.status(200).send("La sesión se ha cerrado correctamente");
		});
	} else {
		return res.status(401).send("No estás autenticado");
	}
});
//!--------------- ruta para envio de email -------------------------------------
router.post("/signUp", (req, res) => {
	const user = {
		email,
		password,
		active: true,
	};
	enviarCorreoConfirmacion(user.email);
	res.json({
		message: "Registered user successfully! Your account is active!",
	});
});

function enviarCorreoConfirmacion(email) {
	const transporter = nodemailer.createTransport({
		service: "Outlook",
		auth: {
			user: "inmueble360henry@hotmail.com",
			pass: "Inmuebles.360",
		},
	});
	const mailOptions = {
		from: "inmueble360henry@hotmail.com",
		to: email,
		subject: "Successfully register",
		text: "¡Thanks for register on Inmuebles360!",
	};
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log("Error al enviar el correo de confirmacion: ", error);
		} else {
			console.log("Correo de confirmacion enviado: ", info.response);
		}
	});
}
//!--------------------------------------------------------------------------------
module.exports = router;
