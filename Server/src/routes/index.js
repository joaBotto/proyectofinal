const { Router } = require("express");
const router = Router();
const creatingUser = require("../controllers/creatingUser");
const creatingProperty = require("../controllers/creatingProperty");
const getProperties = require("../controllers/getProperties")
// CREANDO USUARIO
router.post("/users", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      lastName,
      country,
      city,
      address,
      phoneNumber,
    } = req.body
    const user = {
        email,
        password,
        name,
        lastName,
        country,
        city,
        address,
        phoneNumber,
      }
    if (email && password && name && lastName && country && city && address && phoneNumber) {
        const newUser = await creatingUser(user);
        return res.status(201).json(newUser)
    } else {
        return res.status(400).json({ error: 'missing data' });
    }
  } catch (error) {
        return res.status(500).json({ error: error.message });
  }
});
// CREANDO PROPIEDAD
router.post("/property", async (req, res) => {
    try {
        const {
            title,
            price,
            address,
            bedrooms,
            bathrooms,
            availableDates,
            images,
            owner
        } = req.body
        const newProperty =  {
            title,
            price,
            address,
            bedrooms,
            bathrooms,
            availableDates,
            images,
            owner
        }
        const propertyCreated = await creatingProperty(newProperty)
        return res.status(201).json(propertyCreated);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    } 
})
//PEDIDO DE LAS PROPIEDADES
router.get("/property", async (req,res) => {
    try {
        const properties = await getProperties();
        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

//PEDIDO DEL DETAIL
router.get("/detail/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const propertyDetail = await detailingProperty(id);
        return res.status(200).json(propertyDetail)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})



module.exports = router;
