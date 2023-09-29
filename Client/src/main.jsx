import 'tailwindcss/tailwind.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/store.js'; // Asegúrate de que esta ruta sea correcta

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={appStore}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
