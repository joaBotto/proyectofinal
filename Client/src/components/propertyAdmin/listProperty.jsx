import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserPosts, deletePost, updatePost } from '../../redux/actions';

const UserPosts = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [posts, setPosts] = useState([]); // Estado para almacenar las publicaciones
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostData, setEditedPostData] = useState({
    title: '',
    description: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
  });

  useEffect(() => {
    const fetchUserPosts = async () => {
      // Cargar las publicaciones del usuario cuando el componente se monta
      const response = await dispatch(loadUserPosts(userId));
      setPosts(response.payload); // Actualizar el estado con las publicaciones cargadas
    };

    fetchUserPosts();
  }, [dispatch, userId]);

  const handleDelete = (postId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      dispatch(deletePost(postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    }
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (postToEdit) {
      setEditingPostId(postId);
      setEditedPostData({
        title: postToEdit.title,
        description: postToEdit.description || '',
        price: postToEdit.price || 0,
        bedrooms: postToEdit.bedrooms || 0,
        bathrooms: postToEdit.bathrooms || 0,
      });
    }
  };

  const handleSaveEdit = () => {
    dispatch(updatePost(editingPostId, editedPostData));
    setEditingPostId(null);
  };

  return (
    <div>
      <h2>Tus Publicaciones</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {editingPostId === post._id ? (
              <div>
                <input
                  type="text"
                  value={editedPostData.title}
                  onChange={(e) => setEditedPostData({ ...editedPostData, title: e.target.value })}
                />
                <textarea
                  value={editedPostData.description}
                  onChange={(e) => setEditedPostData({ ...editedPostData, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editedPostData.price}
                  onChange={(e) => setEditedPostData({ ...editedPostData, price: e.target.value })}
                />
                <input
                  type="number"
                  value={editedPostData.bedrooms}
                  onChange={(e) => setEditedPostData({ ...editedPostData, bedrooms: e.target.value })}
                />
                <input
                  type="number"
                  value={editedPostData.bathrooms}
                  onChange={(e) => setEditedPostData({ ...editedPostData, bathrooms: e.target.value })}
                />
                <button onClick={handleSaveEdit}>Guardar</button>
              </div>
            ) : (
              <div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>Precio: ${post.price}</p>
                <p>Habitaciones: {post.bedrooms}</p>
                <p>Baños: {post.bathrooms}</p>
                <button onClick={() => handleDelete(post._id)}>Eliminar</button>
                <button onClick={() => handleEdit(post._id)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
