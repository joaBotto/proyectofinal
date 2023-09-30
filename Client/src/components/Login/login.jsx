import './login.css';
import { Formik } from 'formik';
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Login() {
	let regExPassword = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{1,15}$/;
	let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	return (
		<>
			<NavBar />
			<div className='bg-gray-100 min-h-screen flex items-center justify-center'>
				<Formik
					// Declaramos los valores iniciales
					initialValues={{
						email: '',
						password: '',
					}}
					// Funcion para validar email y passwords
					validate={(valores) => {
						let errores = {};

						// Validamos el email y además testeamos con una expresión regular para que el email escrito sea formato correcto de email
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
							className='bg-white p-8 rounded-lg shadow-md w-96'
							style={{ maxWidth: 'calc(100% - 2rem)' }}
							onSubmit={handleSubmit}
						>
							<h2 className='text-2xl font-bold mb-4'>Log In</h2>
							<div className='mb-4'>
								<label htmlFor='email' className='block text-gray-700'>
									Email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									placeholder='Put your email'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`w-full border rounded px-3 py-2 mt-1 ${
										touched.email && errors.email
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.email && errors.email && (
									<div className='text-red-500 mt-1'>{errors.email}</div>
								)}
							</div>
							<div className='mb-4'>
								<label htmlFor='password' className='block text-gray-700'>
									Password
								</label>
								<input
									type='password'
									id='password'
									name='password'
									placeholder='Put your password'
									onChange={handleChange}
									onBlur={handleBlur}
									className={`w-full border rounded px-3 py-2 mt-1 ${
										touched.password && errors.password
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.password && errors.password && (
									<div className='text-red-500 mt-1'>{errors.password}</div>
								)}
							</div>
							<button
								type='submit'
								className='bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300'
							>
								Log In
							</button>
							<button
								type='submit'
								className='bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 mt-2'
							>
								Log In with Google
							</button>
						</form>
					)}
				</Formik>
			</div>
			<Footer />
		</>
	);
}
