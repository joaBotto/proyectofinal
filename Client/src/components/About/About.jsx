import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import guillermollanos from '../../assets/img/guillermollanos.jpg';
import joaco from '../../assets/img/joaco.jpg';
import Jonnathan from '../../assets/img/jonnathan.jpg';
import emiliano from '../../assets/img/emiliano.jpg';
import sergio from '../../assets/img/sergio.jpg';

const teamMembers = [
	{
		name: 'Sergio Vasquez',
		githubOrPortfolio: 'https://github.com/Ditrex24',
		image: sergio,
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
		githubOrPortfolio: 'https://github.com/Newhistory92',
		image: emiliano,
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
];

const About = () => {
	return (
		<div className='bg-gradient-to-tr from-purple-100 via-indigo-300 to-indigo-500 p-6'>
			<div className='text-center'>
				<h2 className='text-3xl font-bold mb-4 text-violet'>Inmuebles 360</h2>
				<p className='text-lg text-white'>
					This team of 8 individuals, composed of enthusiastic and talented
					students from Soy Henry, came together to complete their final project
					during the full stack development bootcamp. Their mission was to
					create a comprehensive web application that would showcase their
					ability to apply all the knowledge they had gained throughout the
					program. Together, they worked tirelessly to design, develop, and
					deploy a high-level web application that reflected their dedication
					and commitment. With a combination of expertise in design, database
					management, frontend and backend development, security, project
					management, user experience, and server administration, this team
					succeeded in creating a final application that not only operated
					efficiently but also provided an exceptional user experience.
				</p>
				<h2 className='text-violet'>technologies:</h2>
				<p className='text-white'>
					React, JavaScript, HTML, Redux, Tailwind, Bootstrap, AntDesign, Node,
					Cloudinary, Express, MongoDB, Nodemailer, Passport, Stripe, Formik...
				</p>
				<h2 className='text-3xl font-bold mb-4 text-violet'>Members</h2>
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
							GitHub o Portfolio
						</a>
					</div>
				))}
			</div>
			<div className='mt-4 text-center'>
				<Link to={window.location.pathname === '/about' ? '/' : '/about'}>
					<button className='font-onest rounded-full bg-violet px-3.5 py-2.5 text-m font-medium text-white shadow-sm hover:bg-pink'>
						{window.location.pathname === '/about' ? 'Home' : 'Acerca de'}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default About;
