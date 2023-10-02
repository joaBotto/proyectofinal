const express = require('express');
const router = express.Router();
const { getUserPosts } = require('../controllers/postByUser');
const { deletePost } = require('../controllers/deletePostByUser');
const updatePost = require('../controllers/updatePostByUser');

// Ruta para obtener las publicaciones del usuario por su ID
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const userPosts = await getUserPosts(userId);

    if (userPosts.error) {
      return res.status(404).json({ message: userPosts.error });
    }

    res.json(userPosts);
  } catch (error) {
    console.error('Error al cargar las publicaciones del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para eliminar una publicación por su ID
router.delete('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await deletePost(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para actualizar una publicación por su ID
router.put('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const updatedProperty = await updatePost(postId, req.body);

    if (!updatedProperty) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(200).json(updatedProperty); // Devuelve la publicación actualizada
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


/* const express = require('express');
const router = express.Router();
const postByUser = require('../controllers/postByUser');

// Importa el controlador para obtener las publicaciones del usuario
const { getUserPosts } = postByUser;

// Ruta para obtener las publicaciones del usuario por su ID
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const userPosts = await getUserPosts(userId);

    if (userPosts.error) {
      return res.status(404).json({ message: userPosts.error });
    }

    res.json(userPosts);
  } catch (error) {
    console.error('Error al cargar las publicaciones del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;

// handlers/postsHandler.js

const express = require('express');
const router = express.Router();
const deletePostByUser = require('../controllers/deletePostByUser');

// Importa el controlador para eliminar una publicación
const { deletePost } = deletePostByUser;

// Ruta para eliminar una publicación por su ID
router.delete('/:postId', async (req, res) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await deletePost(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;

// handlers/updatePostHandler.js

const updatePost = require('../controllers/updatePostByUser');

const updatePostHandler = async (req, res) => {
  try {
    const postId = req.params.postId; // Obtiene el ID de la publicación de los parámetros de la ruta
    const updatedData = req.body; // Obtiene los datos actualizados de la solicitud

    const updatedProperty = await updatePost(postId, updatedData);

    res.status(200).json(updatedProperty); // Devuelve la publicación actualizada
  } catch (error) {
    console.error('Error al actualizar la publicación:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePostHandler;
 */