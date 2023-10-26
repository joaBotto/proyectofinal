import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import guillermollanos from '../../assets/img/guillermollanos.jpg';
import joaco from '../../assets/img/joaco.jpg';
import Jonnathan from '../../assets/img/jonnathan.jpg';

const teamMembers = [
	{
		name: 'Sergio Vasquez',
		githubOrPortfolio: 'Enlace a GitHub o Portfolio del Miembro 1',
		image: 'URL de la imagen del Miembro 1',
	},
	{
		name: 'Lorena Florio',
		githubOrPortfolio: 'Enlace a GitHub o Portfolio del Miembro 2',
		image: 'URL de la imagen del Miembro 2',
	},
	{
		name: 'Allina Piccardo',
		githubOrPortfolio: 'Enlace a GitHub o Portfolio del Miembro 2',
		image: 'URL de la imagen del Miembro 2',
	},
	{
		name: 'Emiliano Rojo',
		githubOrPortfolio: 'Enlace a GitHub o Portfolio del Miembro 2',
		image: 'URL de la imagen del Miembro 2',
	},
	{
		name: 'Jonnathan Scarpetta',
		githubOrPortfolio: 'https://github.com/jonsxscar',
		image: Jonnathan,
	},
	{
		name: 'Rodrigo Gamero',
		githubOrPortfolio: 'Enlace a GitHub o Portfolio del Miembro 2',
		image: 'URL de la imagen del Miembro 2',
	},
	{
		name: 'Guillermo Llanos',
		githubOrPortfolio: 'https://porfolioguillermollanos.netlify.app/',
		image: guillermollanos,
	},
	{
		name: 'Joaquin Botto',
		githubOrPortfolio: 'https://github.com/joaBotto',
		image: joaco,
	},
	// Agrega información similar para los otros miembros aquí
];

const About = () => {
	return (
		<div className='bg-gradient-to-tr from-purple-100 via-indigo-300 to-indigo-500 p-6'>
			<div className='text-center'>
				<h2 className='text-3xl font-bold mb-4 text-violet'>
					Acerca de Inmuebles 360
				</h2>
				<p className='text-lg text-white'>
					Inmuebles 360 es nuestra propuesta de proyecto final en el bootcamp de
					soyHenry. Se trata de una aplicación de alquiler inmobiliario, ya sea
					para vivir o para alojarse durante unas vacaciones. Esta plataforma
					simplifica el proceso de alquilar y gestionar propiedades, brindando
					una experiencia amigable tanto para propietarios como para inquilinos.
				</p>
				<h2 className='text-violet'>Tecnologías:</h2>
				<p className='text-white'>
					React, JavaScript, HTML, Redux, Tailwind, Bootstrap, AntDesign, Node,
					Cloudinary, Express, MongoDB, Nodemailer, Passport, Stripe, Formik...
				</p>
				<h2 className='text-3xl font-bold mb-4 text-violet'>Integrantes</h2>
			</div>
			<div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center'>
				{teamMembers.map((member, index) => (
					<div key={index} className='bg-white p-4 rounded-lg shadow-md'>
						<img
							src={member.image}
							alt={member.name}
							className='w-32 h-32 mx-auto rounded-full mb-4'
						/>
						<h3 className='text-lg font-semibold text-violet'>{member.name}</h3>
						<a
							href={member.githubOrPortfolio}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-500 hover:underline block mt-2'
						>
							Ver GitHub o Portfolio
						</a>
					</div>
				))}
			</div>
			<div className='mt-4 text-center'>
				<Link to={window.location.pathname === '/about' ? '/' : '/about'}>
					<button className='font-onest rounded-full bg-violet px-3.5 py-2.5 text-m font-medium text-white shadow-sm hover:bg-pink'>
						{window.location.pathname === '/about' ? 'Inicio' : 'Acerca de'}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default About;
