const { Router } = require("express");
const router = Router();

const { propertiesRouter } = require("./propertiesRouter");
const { usersRouter } = require("./usersRouter");
const { authRouter } = require("./authRouter")

// Configurar los routers
router.use("/property", propertiesRouter); // ruta_backend/properties -> Te lleva al router de propiedades
router.use("/users", usersRouter); // ruta_backend/users -> Te lleva al router de useres
router.use("/auth", authRouter )
module.exports = router;
