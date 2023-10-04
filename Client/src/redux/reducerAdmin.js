import { LOAD_USER_POSTS, DELETE_POST, UPDATE_POST } from "./actionsTypesAdmin";

const initialState = {
  userPosts: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_USER_POSTS:
      return {
        ...state,
        userPosts: payload, // Actualiza el estado con las publicaciones del usuario
      };

    case DELETE_POST: {
      const updatedUserPosts = state.userPosts.filter(
        (post) => post.id !== payload
      );
      return {
        ...state,
        userPosts: updatedUserPosts,
      };
    }

    case UPDATE_POST: {
      const updatedUserPosts = state.userPosts.map((post) => {
        if (post.id === payload.id) {
          return payload; // Reemplaza la publicación existente con la actualizada
        }
        return post;
      });
      return {
        ...state,
        userPosts: updatedUserPosts,
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
