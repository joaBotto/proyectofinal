import React from 'react';
import axios from 'axios';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51O05j9I6gYqlkFFnCH6Jn4JTYyyzAGAZ8fZk2KDKUGzwTTMQ20XhGGuGp7DnkOXLPESmkC5PGBoxHO9MyMyS8KOZ00ld8wpuns'
);

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		if (!error) {
			const { id } = paymentMethod;

			try {
				const { data } = await axios.post('/api/checkout', {
					id,
					amount: 10000,
				});
				console.log(data);

				elements.getElement(CardElement).clear();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center'>
			<h1 className='text-2xl font-semibold mb-4'>Pasarela de Pagos</h1>
			<h2>Hola</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<CardElement
						className='border rounded-md p-4'
						options={{
							style: {
								base: {
									fontSize: '18px', // Aumentar el tamaño del texto en la tarjeta
									color: '#333', // Cambiar el color del texto
									'::placeholder': {
										color: '#aab7c4',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>
				</div>
				<button
					className='w-full bg-green-500 text-blue font-semibold py-2 rounded-md'
					type='submit'
				>
					Buy
				</button>
			</form>
		</div>
	);
};

const PaymentForm = () => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default PaymentForm;
