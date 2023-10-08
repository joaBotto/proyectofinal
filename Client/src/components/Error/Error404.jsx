import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/error404.png';

const Error = () => {
	return (
		<div
			className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 z-50'
			style={{ backdropFilter: 'blur(8px)' }} // Opcional: añade un efecto de desenfoque al fondo
		>
			<div className='max-w-md p-6 bg-white rounded-lg shadow-md'>
				<img src={errorImage} className='w-64 mx-auto' alt='Error 404' />
				<p className='text-2xl font-bold text-center mt-4'>
					Oops! Page not found.
				</p>
				<p className='text-gray-600 text-lg text-center'>
					The page you are looking for does not exist.
				</p>

				<div className='text-blue-500 hover:underline block text-center mt-4'>
					<Link to='/'>Home</Link>
				</div>
			</div>
		</div>
	);
};

export default Error;
