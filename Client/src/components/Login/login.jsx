import './login.css';
import { Formik } from 'formik';
import React from 'react';
import fondo from '../../assets/img/loginRegister.jpg';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Login() {
	let regExPassword = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{1,15}$/;
	let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	return (
		<div
			className='min-h-screen flex flex-col items-center justify-between bg-fuchsia-900'
			style={{
				backgroundImage: `url(${fondo})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='w-1/3'>
				<Formik
					// Declaramos los valores iniciales
					initialValues={{
						email: '',
						password: '',
					}}
					// Funcion para validar email y passwords
					validate={(valores) => {
						let errores = {};

						// Validamos el email y ademas testeamos con una expresion regular para que el email escrito sea formato correcto de email
						if (!valores.email) {
							errores.email = 'Please, put an email';
						} else if (!regExEmail.test(valores.email)) {
							errores.email = 'Invalid email';
						}
						if (!valores.password) {
							errores.password = 'Please, put your password';
						} else if (!regExPassword.test(valores.password)) {
							errores.password = 'Invalid password';
						}

						return errores;
					}}
					onSubmit={(valores, { resetForm }) => {
						console.log('Formulario enviado');
						resetForm();
					}}
				>
					{({
						values,
						errors,
						touched,
						handleSubmit,
						handleChange,
						handleBlur,
					}) => (
						<form
							className='bg-white rounded-lg p-6 shadow-lg'
							onSubmit={handleSubmit}
						>
							<h1 className='text-5xl font-semibold text-left mb-4 text-gray-700'>
								<img src={logo} alt='Logo' />
							</h1>
							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-left text-gray-700'
								></label>
								<input
									type='email'
									id='email'
									name='email'
									placeholder='Email'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`mt-1 p-2 w-full rounded-full border ${
										touched.email && errors.email
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.email && errors.email && (
									<div className='text-red-500 mt-2 text-sm'>
										{errors.email}
									</div>
								)}
							</div>
							<div className='mb-4'>
								<label
									htmlFor='password'
									className='block text-left text-gray-700'
								></label>
								<input
									type='password'
									id='password'
									name='password'
									placeholder='Password'
									onChange={handleChange}
									onBlur={handleBlur}
									className={`mt-1 p-2 w-full rounded-full border ${
										touched.password && errors.password
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.password && errors.password && (
									<div className='text-red-500 mt-2 text-sm'>
										{errors.password}
									</div>
								)}
							</div>
							<div>
								<Link to='/'>
									<button
										type='submit'
										className='block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2'
									>
										Login
									</button>
								</Link>
								<button
									type='submit'
									className='block bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-900'
								>
									Login with Google
								</button>
							</div>
						</form>
					)}
				</Formik>
				<p>
					You still don't have an account? <Link to='/signUp'>SignUp</Link>
				</p>
			</div>
			<Footer /> {/* Agrega el Footer aquí */}
		</div>
	);
}
