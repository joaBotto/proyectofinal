const getUserPosts = require('../controllers/postByUser');
const deletePost = require('../controllers/deletePostByUser')
const updatePost = require('../controllers/updatePostByUser')

const getUserPostsHandler = async (req, res) =>{
    const { userId } = req.query;

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
}

const deletePostHandler = async (req, res) => {
    const { postId } = req.params;
    try {
        const deletedPostUser = await deletePost(postId);
    
        if (!deletedPostUser) {
          return res.status(404).json({ message: 'Publicación no encontrada' });
        }
    
        res.status(204).send(); // Respuesta exitosa sin contenido
      } catch (error) {
        console.error('Error al eliminar la publicación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
}

const updatePostHandler = async (req, res) => {
    const { postId } = req.params;
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
}

module.exports = {
    getUserPostsHandler,
    deletePostHandler,
    updatePostHandler
};