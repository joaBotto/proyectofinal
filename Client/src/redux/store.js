
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"
import rootReducer from "./reducer";


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['properties', 'allproperties'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
	persistedReducer,
	composeEnhancer(applyMiddleware(thunkMiddleware))
);
export const persistor = persistStore(store);


