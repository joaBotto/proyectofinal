const { Router } = require('express');
const usersRouter = Router();
const {
	createUserHandler,
	getUsersHandlers,
	editUserHandler,
} = require('../handlers/userHandler');

usersRouter.post('/', createUserHandler);
usersRouter.put('/', editUserHandler);
usersRouter.get('/', getUsersHandlers);

module.exports = {
	usersRouter,
};
