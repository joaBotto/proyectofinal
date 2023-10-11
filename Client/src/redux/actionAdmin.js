import axios from "axios";

import { LOAD_USER_POSTS, DELETE_POST, UPDATE_POST } from "./actionsTypesAdmin";

export const loadUserPosts = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/adminProperties?userId=${userId}`);
      dispatch({
        type: LOAD_USER_POSTS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al cargar las publicaciones del usuario:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al cargar las publicaciones del usuario",
      });
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/adminProperties/${postId}`);
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al eliminar la publicación",
      });
    }
  };
};

export const updatePost = (postId, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/adminProperties/${postId}`, updatedData);
      dispatch({
        type: UPDATE_POST,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      dispatch({
        type: "ERROR",
        payload: "Error al actualizar la publicación",
      });
    }
  };
};
