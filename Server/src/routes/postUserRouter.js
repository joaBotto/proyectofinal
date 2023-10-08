const { Router } = require('express');
const userPostsRouter = Router();
const {
	getUserPostsHandler,
	deletePostHandler,
	updatePostHandler,
} = require('../handlers/postUserHandler');

// Ruta para obtener las publicaciones del usuario por su ID
userPostsRouter.get('/', getUserPostsHandler);
userPostsRouter.delete('/:postId', deletePostHandler);
userPostsRouter.put('/:postId', updatePostHandler);

module.exports = { userPostsRouter };
