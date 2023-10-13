const { Router } = require("express");
const usersRouter = Router();
const { createUserHandler, getAllUsersHandlers, editUserHandler } = require("../handlers/userHandler");


usersRouter.get("/", getAllUsersHandlers);
usersRouter.post("/", createUserHandler);
usersRouter.put("/", editUserHandler)



module.exports = { 
            usersRouter
        };
