
const { Router } = require("express");
const propertiesRouter = Router();
const { getPropertiesHandler, getPropertyByIdHandler, creatingPropertyHandler } = require("../handlers/propertyHandler");



propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.post("/", creatingPropertyHandler);

module.exports = { 
        propertiesRouter
        };