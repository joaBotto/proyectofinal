//import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import React from 'react'; // Importa React, useEffect y useState solo si los necesitas más adelante
import SearchBar from '../SearchBar/SearchBar';
import fondo from '../../img/fondoHerp.jpeg';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Importa el ícono de inicio de sesión

const NavBar = () => {
	// Puedes mantener useState y useEffect si planeas usarlos más adelante
	// const [properties, setProperties] = useState([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	axios
	// 		.get('/ruta_backend/properties')
	// 		.then((response) => {
	// 			setProperties(response.data);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error al obtener propiedades:', error);
	// 			setLoading(false);
	// 		});
	// }, []);

	const handleLoginButtonClick = () => {
		// Redirige a la página de inicio de sesión cuando se hace clic en el botón
		window.location.href = '/login';
	};

	return (
		<div className='bg-gray-800 text-white'>
			{/* Hero con imagen de fondo */}
			<div
				style={{ backgroundImage: `url(${fondo})` }}
				className='bg-cover bg-center min-h-[200px] flex items-center relative'
			>
				{/* Logo en la esquina superior izquierda */}
				<div className='absolute top-0 left-0 mt-4 ml-4'>
					<img className='h-12 w-12' src={logo} alt='Your Company' />
				</div>
				{/* Enlaces en la esquina superior derecha */}
				<div className='absolute top-0 right-0 mt-4 mr-4 space-x-4'>
					<a href='#' className='text-white'>
						HOME
					</a>
					<a href='#' className='text-white'>
						ABOUT
					</a>
					<a href='#' className='text-white'>
						SAVED
					</a>
					{/* Botón de inicio de sesión */}
					<Link to='/login' className='text-white'>
						<FontAwesomeIcon icon={faSignInAlt} /> LOGIN
					</Link>
				</div>
				<h4 className='text-2xl font-semibold text-purple-600 mt-8 ml-4'>
					FIND A HOME THAT
					<br /> SUITS YOU
				</h4>
			</div>

			{/* Resto de tu código */}
			<header className='bg-white shadow py-4'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						{/* Renderiza el componente Searchbar aquí */}
						<SearchBar /* properties={properties} */ />
					</h1>
				</div>
			</header>

			{/* Aquí puedes agregar más contenido si es necesario */}
		</div>
	);
};

export default NavBar;
