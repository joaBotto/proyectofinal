const { Router } = require('express');
const postsRouter = Router();
const postsHandler = require('../handlers/postUserHandler');
const updatePostHandler = require('../handlers/updatePostHandler');

// Importa el manejador de rutas para obtener las publicaciones del usuario
const { getUserPosts, deletePost } = postsHandler;

// Ruta para obtener las publicaciones del usuario por su ID
postsRouter.get('/', getUserPosts);

// Ruta para eliminar una publicación por su ID
postsRouter.delete('/:postId', deletePost);

// Ruta para actualizar una publicación por su ID
postsRouter.put('/:postId', updatePostHandler);

module.exports = postsRouter;


/* // routes/postsRoutes.js

const { Router } = require('express');
const postsRouter = Router();
const postsHandler = require('../handlers/postUserHandler');

// Importa el manejador de rutas para eliminar una publicación
const { deletePost } = postsHandler;

// Ruta para eliminar una publicación por su ID
postsRouter.delete('/:postId', deletePost);

module.exports = postsRouter;

// routes/postsRoutes.js

const { Router } = require('express');
const postsRouter = Router();
const postsHandler = require('../handlers/postUserHandler');

// Importa el manejador de rutas para obtener las publicaciones del usuario
const { getUserPosts } = postsHandler;

// Ruta para obtener las publicaciones del usuario por su ID
postsRouter.get('/', getUserPosts);

module.exports = postsRouter;

// routes/updatePostRoutes.js

const { Router } = require('express');
const updatePostHandler = require('../handlers/updatePostHandler');

const updatePostRouter = Router();

// Ruta para actualizar una publicación por su ID
updatePostRouter.put('/:postId', updatePostHandler);

module.exports = updatePostRouter;
 */