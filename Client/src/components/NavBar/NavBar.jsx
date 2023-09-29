import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import fondo from '../../img/fondoHerp.jpeg';
import logo from '../../img/logo.png';

const NavBar = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get('/ruta_backend/properties')
			.then((response) => {
				setProperties(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error al obtener propiedades:', error);
				setLoading(false);
			});
	}, []);

	return (
		<div className='bg-gray-800 text-white'>
			{/* Hero con imagen de fondo */}
			<div
				style={{ backgroundImage: `url(${fondo})` }}
				class='bg-cover bg-center min-h-[200px] flex items-center relative'
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
					{/* Icono de inicio de sesión */}
					<button className='text-white'>
						{/* Agrega aquí tu icono de inicio de sesión */}
					</button>
				</div>
				<h4 className='text-2xl font-semibold text-purple-600 mt-8 ml-4'>
					FIND A HOME THAT
					<br /> SUIT YOU
				</h4>
			</div>

			{/* Resto de tu código */}
			<header className='bg-white shadow py-4'>
				<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold text-gray-900'>
						{/* Renderiza el componente Searchbar aquí */}
						<SearchBar properties={properties} />
					</h1>
				</div>
			</header>

			{/* Aquí puedes agregar más contenido si es necesario */}
		</div>
	);
};

export default NavBar;
