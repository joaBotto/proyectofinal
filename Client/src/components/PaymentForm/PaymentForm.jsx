import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions";
import { useEffect, useState } from "react";
import Success from "../PaymentForm/PaymentSuccessful";
import Loading from "./Loading";
import { FadeLoader } from "react-spinners";

import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
	"pk_test_51O05j9I6gYqlkFFnCH6Jn4JTYyyzAGAZ8fZk2KDKUGzwTTMQ20XhGGuGp7DnkOXLPESmkC5PGBoxHO9MyMyS8KOZ00ld8wpuns"
);

const CheckoutForm = ({ totalAmount }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const [showModal, setShowModal] = useState(false);
	const [showModalLoading, setShowModalLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});
		if (!error) {
			const { id } = paymentMethod;

			try {
				const { status } = await axios.post("/api/checkout", {
					id,
					amount: totalAmount * 100,
				});

				if (status === 200) {
					setShowModal(true);
					dispatch(getUserById(user._id));
					// console.log("SOY EL EMAIL", user.email)
					await axios.post("http://localhost:3001/mail/payments", {
						email: user.email,
					});
				}
				elements.getElement(CardElement).clear();
			} catch (error) {
				setError(true);
			} finally {
				setShowModalLoading(false);
			}
		}
	};

	return (
		<div className="w-full max-h-[300px] max-w-md mx-auto p-10 bg-white rounded-lg shadow-lg text-center">
			{showModal && <Success setShowModal={setShowModal} />}
			<p className="font-onest pb-6 uppercase text-cyan font-bold text-xl">
				Payment Method
			</p>
			<form onSubmit={handleSubmit}>
				<div className="mb-4 ">
					<CardElement
						className="border rounded-md p-4"
						options={{
							style: {
								base: {
									fontSize: "18px", // Aumentar el tamaño del texto en la tarjeta
									color: "#333", // Cambiar el color del texto
									"::placeholder": {
										color: "#aab7c4",
									},
								},
								invalid: {
									color: "#9e2146",
								},
							},
						}}
					/>
				</div>
				<div className="flex flex-row w-full justify-between">
					<p className="font-onest font-bold text-blue text-2xl">
						U$D {totalAmount}
					</p>
					<button
						className="w-1/2 bg-violet text-white hover:bg-pink text-onest font-semibold py-2 rounded-full"
						type="submit"
					>
						Pay
					</button>
				</div>
			</form>
			{error && (
				<div>
					<p className="text-2xl text-right text-blue font-onest font-extrabold px-3 uppercase">
						There was an error with your reservation!
					</p>
					<p className="text-xl text-right text-cyan font-onest uppercase font-bold px-3">
						Please try again!
					</p>
				</div>
			)}
		</div>
	);
};

const PaymentForm = ({ totalAmount }) => {
	return (
		<div className="w-full ml-11">
			<Elements stripe={stripePromise}>
				<CheckoutForm totalAmount={totalAmount} />
			</Elements>
		</div>
	);
};

export default PaymentForm;
