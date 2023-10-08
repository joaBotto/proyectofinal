const passport = require("passport");
const { Router } = require("express");
const propertiesRouter = Router();
const { getPropertiesHandler, getPropertyByIdHandler, creatingPropertyHandler } = require("../handlers/propertyHandler");



propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.post("/",creatingPropertyHandler);
/* , (req, res, next) => {
  console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
          next(); 
        } else {
          console.log(req.user)
          res.status(401).json({ message: "No autorizado" });
        }
      }  */

module.exports = { 
        propertiesRouter
        };