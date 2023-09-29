const { Router } = require("express");
const usersRouter = Router();
const { createUserHandler, getUsersHandlers, editUserHandler } = require("../handlers/userHandler");
const getLoginHandlers = require('../handlers/loginHandler');

usersRouter.post("/", createUserHandler);
usersRouter.put("/", editUserHandler)
usersRouter.get("/", getUsersHandlers);
usersRouter.get("/login", getLoginHandlers);


module.exports = { 
            usersRouter
        };
