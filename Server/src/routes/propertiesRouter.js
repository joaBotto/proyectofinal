/* 
const { Router } = require("express");
const propertiesRouter = Router();
const { getPropertiesHandler, getPropertyByIdHandler, creatingPropertyHandler } = require("../handlers/propertyHandler");



propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.post("/", creatingPropertyHandler);

module.exports = { 
        propertiesRouter
        }; */

        // propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.put('/:propertyId', propertyController.updateProperty);
// Define otras rutas para operaciones CRUD en propiedades

module.exports = router;