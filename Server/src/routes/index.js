const { Router } = require("express");
const router = Router();
const multer = require("multer");
const cloudinary = require("../cloudinaryConfig.js");
const fs = require('fs').promises;


const { propertiesRouter } = require("./propertiesRouter");
const { usersRouter } = require("./usersRouter");
const { authRouter } = require("./authRouter");

const storage = multer.memoryStorage(); // Almacenamiento en memoria (puedes cambiarlo para guardar en disco si lo prefieres)
const upload = multer({
  storage: storage, // Utiliza el almacenamiento en memoria
  limits: { fileSize: 1024 * 1024 }, // Límite de tamaño del archivo en bytes (1MB en este caso)
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: "No se proporcionó ninguna imagen." });
    }
    // Guarda el archivo temporalmente en el sistema de archivos local
    const temporaryFilePath = `/tmp/${req.file.originalname}`; 
    await fs.writeFile(temporaryFilePath, req.file.buffer);

    const result = await cloudinary.uploader.upload(temporaryFilePath, {
      folder: 'c57629ef1b093e38460ef8101c94f36653'
    });

    await fs.unlink(temporaryFilePath);

    return res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    return res.status(500).json({ message: "Error al cargar la imagen." });
  }
});


router.use("/auth", authRouter);
router.use("/properties", propertiesRouter); // ruta_backend/properties -> Te lleva al router de propiedades
router.use("/users", usersRouter); // ruta_backend/users -> Te lleva al router de users


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

module.exports = router;
