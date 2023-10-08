import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import { createProperty } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CreatePropertyAdmin() {
	const user = useSelector((state) => state.user);
	const user_id = user._id;
	console.log('soy el id', user_id);
	const [valuesToSubmit, setValuesToSubmit] = useState(null);

	console.log('soy el usuario en createProperty', user);
	let dates = [];
	const dispatch = useDispatch();

	useEffect(() => {
		if (user && valuesToSubmit) {
			handleSubmit(valuesToSubmit);
		}
	}, [user, valuesToSubmit]);

	const uploadImagesToCloudinary = async (file) => {
		const formData = new FormData();
		formData.append('file', file[0]);
		try {
			const { data } = await axios.post(
				'http://localhost:3001/upload',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			return data;
		} catch (error) {
			console.error('Error al cargar la imagen:', error);
		}
	};

	function generateDatesInRange(startDate, endDate) {
		const dates = [];
		let currentDate = new Date(startDate);
		while (currentDate <= endDate) {
			dates.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}
		return dates;
	}

	const initialValues = {
		title: '',
		description: '',
		address: {
			street: '',
			city: '',
			state: '',
			zipcode: '',
		},
		bedrooms: 0,
		bathrooms: 0,
		price: 0,
		type: 'casa',
		availableDates: {
			startDate: '',
			endDate: '',
		},
		images: [],
		amenities: {
			covered_area: 0,
			garage: false,
			antique: 0,
			grill: false,
			heating: false,
		},
		additional: {
			swimmingpool: false,
			terrace: false,
			dining_room: false,
			washing_machine: false,
			internet_wifi: false,
			refrigerator: false,
			microwave: false,
			coffee_maker: false,
			patio: false,
			balcony_patio: false,
		},
	};

	const handleSubmit = (values) => {
		const {
			title,
			additional,
			address,
			amenities,
			bathrooms,
			bedrooms,
			description,
			images,
			price,
			type,
		} = values;
		const newProperty = {
			title,
			additional,
			address,
			amenities,
			availableDays: dates,
			bathrooms,
			bedrooms,
			description,
			images,
			owner: user_id,
			price,
			type,
		};
		console.log('soy la info a mandar', newProperty);

		dispatch(createProperty(newProperty));
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string()
			.required('El título es requerido')
			.min(5, 'Título muy corto, debe tener al menos 5 caracteres'),
		description: Yup.string().required('La descripción es requerida'),
		address: Yup.object().shape({
			street: Yup.string().required('La calle es requerida'),
			city: Yup.string().required('La ciudad es requerida'),
			state: Yup.string().required('El estado es requerido'),
			zipcode: Yup.number().required('El código postal es requerido'),
		}),
		bedrooms: Yup.number()
			.required('El número de habitaciones es requerido')
			.min(0)
			.max(10),
		bathrooms: Yup.number()
			.required('El número de baños es requerido')
			.min(0)
			.max(10),
		price: Yup.number().required('El precio es requerido').min(1).max(100000),
		availableDates: Yup.object().shape({
			startDate: Yup.date()
				.required('Fecha de inicio requerida')
				.min(new Date(), 'La fecha de inicio debe ser a partir de hoy'),
			endDate: Yup.date()
				.required('Fecha de finalización requerida')
				.min(
					Yup.ref('startDate'),
					'La fecha de finalización debe ser posterior a la fecha de inicio'
				),
		}),
		images: Yup.array()
			.required('Debe agregar 5 imágenes al menos')
			.test(
				'is-images-length',
				'Debe agregar al menos 5 imágenes',
				(images) => {
					return images && images.length === 5;
				}
			),
	});

	return (
		<div
			className='min-h-screen w-screen flex items-center justify-center'
			style={{
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					setValuesToSubmit(values);
					setSubmitting(false);
				}}
			>
				{({ values, isSubmitting, setFieldValue }) => (
					<Form className='bg-white rounded-lg p-6 shadow-lg my-10'>
						<h1 className='text-5xl font-semibold text-left mb-4 text-gray-700'>
							Register your property
						</h1>
						<Link to='/admin'>
							<button className='block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2'>
								ADMIN
							</button>
						</Link>
						/////////TITULO DE LA PUBLICACION
						<div className='block text-left text-gray-700'>
							<label htmlFor='title'>Title:</label>
							<Field
								type='text'
								name='title'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='title' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='description'>Description:</label>
							<Field
								as='textarea'
								name='description'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='description' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='Address' className='block'>
								Address:
							</label>
							<label htmlFor='address.street'>Street:</label>
							<Field
								type='text'
								name='address.street'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='address.street' component='div' />
							<label htmlFor='address.city'>City:</label>
							<Field
								type='text'
								name='address.city'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='address.city' component='div' />
							<label htmlFor='address.state'>State:</label>
							<Field
								type='text'
								name='address.state'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='address.state' component='div' />
							<label htmlFor='address.zipcode'>Zipcode:</label>
							<Field
								type='number'
								name='address.zipcode'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='address.zipcode' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='bedrooms'>Bedrooms:</label>
							<Field
								type='number'
								name='bedrooms'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='bedrooms' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='bathrooms'>Bathrooms:</label>
							<Field
								type='number'
								name='bathrooms'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='bathrooms' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='price'>Price:</label>
							<Field
								type='number'
								name='price'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='price' component='div' />
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='type'>Type:</label>
							<Field
								as='select'
								name='type'
								className='mt-1 p-2 w-full rounded-full border'
							>
								<option value='default'>TIPO DE INMUEBLE</option>
								<option value='house'>HOUSE</option>
								<option value='depto'>APPARTMENT</option>
								<option value='ph'>PH</option>
							</Field>
						</div>
						<div>
							<p>Amenities</p>
							<label htmlFor='amenities.covered_area'>Covered_area:</label>
							<Field
								type='number'
								name='amenities.covered_area'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='amenities.covered_area' component='div' />
							<label htmlFor='amenities.antique'>Antique:</label>
							<Field
								type='number'
								name='amenities.antique'
								className='mt-1 p-2 w-full rounded-full border'
							/>
							<ErrorMessage name='amenities.antique' component='div' />
							<label>
								<Field type='checkbox' name='amenities.garage' />
								garage
							</label>
							<label>
								<Field type='checkbox' name='amenities.grill' />
								grill
							</label>
							<label>
								<Field type='checkbox' name='amenities.heating' />
								heating
							</label>
						</div>
						<div>
							<p>Additional</p>
							<label>
								<Field type='checkbox' name='additional.swimmingpool' />
								swimming Pool
							</label>
							<label>
								<Field type='checkbox' name='additional.terrace' />
								terrace
							</label>
							<label>
								<Field type='checkbox' name='additional.dining_room' />
								dining_room
							</label>
							<label>
								<Field type='checkbox' name='additional.washing_machine' />
								washing_machine
							</label>
							<label>
								<Field type='checkbox' name='additional.internet_wifi' />
								internet_wifi
							</label>
							<label>
								<Field type='checkbox' name='additional.refrigerator' />
								refrigerator
							</label>
							<label>
								<Field type='checkbox' name='additional.microwave' />
								microwave
							</label>
							<label>
								<Field type='checkbox' name='additional.coffee_maker' />
								coffee_maker
							</label>
							<label>
								<Field type='checkbox' name='additional.patio' />
								patio
							</label>
							<label>
								<Field type='checkbox' name='additional.balcony_patio' />
								balcony_patio
							</label>
						</div>
						<div className='block text-left text-gray-700'>
							<label htmlFor='availableDates.startDate'>Fecha de inicio:</label>
							<Field name='availableDates.startDate' type='date' />
							<ErrorMessage name='availableDates.startDate' component='div' />
							<label htmlFor='availableDates.endDate'>
								Fecha de finalizacion:
							</label>
							<Field
								name='availableDates.endDate'
								type='date'
								onChange={(event) => {
									const endDateValue = event.target.value;
									setFieldValue('availableDates.endDate', endDateValue);
									const startDateValue = values.availableDates.startDate;

									if (startDateValue && endDateValue) {
										const startDate = new Date(startDateValue);
										const endDate = new Date(endDateValue);
										dates = generateDatesInRange(startDate, endDate);
										console.log(dates);
									}
								}}
							/>
							<ErrorMessage name='availableDays.endDate' component='div' />
						</div>
						<div>
							<Dropzone
								onDrop={async (acceptedFiles) => {
									if (values.images.length + acceptedFiles.length <= 10) {
										const uploadImageUrl = await uploadImagesToCloudinary(
											acceptedFiles
										);
										console.log('soy la devolucion del back', uploadImageUrl);
										const newImages = [...values.images, uploadImageUrl];
										setFieldValue('images', newImages);
									} else {
										alert('No puedes subir más de 10 imágenes.');
									}
								}}
								accept='image/*'
								multiple={false}
								className='dropzone'
							>
								{({ getRootProps, getInputProps }) => (
									<div {...getRootProps()} className='dropzone'>
										<input {...getInputProps()} />
										{values.images &&
											values.images.map(
												(e) =>
													e &&
													e.imageUrl && (
														<img
															style={{ maxWidth: '10em', maxHeight: '10em' }}
															key={e.imageUrl}
															src={e.imageUrl}
															alt={e.imageUrl}
														/>
													)
											)}
										{!values.images && (
											<p className='text-black'>
												Arrastra y suelta archivos aquí o haz clic para
												seleccionar (máximo 5 imágenes)
											</p>
										)}
									</div>
								)}
							</Dropzone>
						</div>
						<div>
							<button
								type='submit'
								disabled={isSubmitting}
								className='block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2'
							>
								Close Edit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
