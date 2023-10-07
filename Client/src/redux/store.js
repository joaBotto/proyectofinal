
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	key: 'root',
	storage, 
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	composeEnhancer(applyMiddleware(thunkMiddleware)),
	persistedReducer
);
export const persistor = persistStore(store);


