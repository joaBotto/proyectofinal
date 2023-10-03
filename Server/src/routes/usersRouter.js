/* const { Router } = require("express");
const usersRouter = Router();
const { createUserHandler, getUsersHandlers, editUserHandler } = require("../handlers/userHandler");


usersRouter.post("/", createUserHandler);
usersRouter.put("/", editUserHandler)
usersRouter.get("/", getUsersHandlers);



module.exports = { 
            usersRouter
        };
 */

        // userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:userId/properties', userController.getUserProperties);
router.delete('/:userId/properties/:propertyId', userController.deleteUserProperty);
// Define otras rutas para operaciones CRUD en usuarios

module.exports = router;