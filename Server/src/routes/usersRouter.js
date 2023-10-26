const { Router } = require("express");
const usersRouter = Router();
const { createUserHandler, getAllUsersHandlers, editUserHandler, getUserByIdHandler } = require("../handlers/userHandler");

usersRouter.get("/:id", getUserByIdHandler)
usersRouter.get("/", getAllUsersHandlers);
usersRouter.post("/", createUserHandler);
usersRouter.put("/", editUserHandler)



module.exports = { 
            usersRouter
        };
