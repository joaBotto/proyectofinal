const { Router } = require("express");
const usersRouter = Router();
const { createUserHandler } = require("../handlers/userHandler");

usersRouter.post("/", createUserHandler);


module.exports = { 
            usersRouter
        };
