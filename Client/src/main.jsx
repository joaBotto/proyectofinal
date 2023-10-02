import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import "tailwindcss/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
=======
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
>>>>>>> e4cdef7 (configuracion de cloudinary en el back)
);
