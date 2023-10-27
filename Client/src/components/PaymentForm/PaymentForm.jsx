import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/actions';
import { useEffect, useState } from 'react';
import Success from "../PaymentForm/PaymentSuccessful";


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




const CheckoutForm = ({ totalAmount }) => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch();
	// console.log("SOY EL USER", user)
	// console.log(totalAmount);
	const stripe = useStripe();
	const elements = useElements();
	const [showModal, setShowModal] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		if (!error) {
			const { id } = paymentMethod;

			try {
				const { status } = await axios.post('/api/checkout', {
					id,
					amount: totalAmount * 100,
				});
				if ( status === 200 ) {
					setShowModal(true)
					dispatch(getUserById(user._id))
					// console.log("SOY EL EMAIL", user.email)
					await axios.post("http://localhost:3001/mail/payments", {email:user.email})
				}
				console.log(status);

				elements.getElement(CardElement).clear();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center'>
			{showModal && (< Success setShowModal = {setShowModal} />)} 
			<h1 className='text-2xl font-semibold mb-4'>Pasarela de Pagos</h1>
			<h2>USD: {totalAmount}</h2>

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

const PaymentForm = ({ totalAmount }) => {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutForm totalAmount={totalAmount} />
		</Elements>
	);
};

export default PaymentForm;
