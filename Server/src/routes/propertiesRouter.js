const passport = require("passport");
const { Router } = require("express");
const propertiesRouter = Router();
const {
	getPropertiesHandler,
	getPropertyByIdHandler,
	creatingPropertyHandler,
	editPropertyHandler,
	editPropertyAvailability,
} = require("../handlers/propertyHandler");

<<<<<<< HEAD
propertiesRouter.put("/", editPropertyHandler);
propertiesRouter.put("/:id", editPropertyAvailability);
=======

propertiesRouter.put("/",editPropertyHandler)
>>>>>>> 2d72d61 (terminando la auth por terceros)
propertiesRouter.get("/", getPropertiesHandler);
propertiesRouter.get("/:id", getPropertyByIdHandler);
propertiesRouter.post("/", creatingPropertyHandler);

 
/* (req, res, next) => {
  console.log(req.isAuthenticated())
        if (req.isAuthenticated()) {
          next(); 
        } else {
          console.log(req.user)
          res.status(401).json({ message: "No autorizado" });
        }
      }, */
<<<<<<< HEAD

module.exports = {
	propertiesRouter,
};
=======
      
module.exports = { 
        propertiesRouter
        };
>>>>>>> 2d72d61 (terminando la auth por terceros)
