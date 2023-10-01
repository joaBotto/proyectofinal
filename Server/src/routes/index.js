const { Router } = require("express");
const router = Router();

const { propertiesRouter } = require("./propertiesRouter");
const { usersRouter } = require("./usersRouter");
const { authRouter } = require("./authRouter")

// Configurar los routers
router.use("/auth", authRouter )
router.use("/properties", propertiesRouter); // ruta_backend/properties -> Te lleva al router de propiedades
router.use("/users", usersRouter); // ruta_backend/users -> Te lleva al router de useres

router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al cerrar la sesión');
            }
            return res.status(200).send('La sesión se ha cerrado correctamente');
        });
    } else {
        return res.status(401).send('No estás autenticado');
    }
});



module.exports = router;
