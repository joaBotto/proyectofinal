import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooking } from "../../redux/actions"; // Suponiendo que getBooking se usa para recuperar una sola reserva
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { FadeLoader } from "react-spinners";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Reservations() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const booking = useSelector((state) => state.bookingDetail);

	console.log(booking);

	useEffect(() => {
		dispatch(getBooking(id));
	}, [dispatch, id]);

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="w-full justify-end">
				<button className="fixed right-2 flex flex-row justify-end text-white bg-transparent rounded-full mr-6">
					<Link to="/">
						<FontAwesomeIcon
							icon={faHouse}
							className="bg-cyan text-blue text-2xl py-2 px-2 rounded-full justify-center shadow-lg"
						/>
					</Link>
				</button>
			</div>
			{booking && booking.property ? (
				<div className="p-11">
					<h1 className="text-5xl font-onest font-extrabold uppercase text-cyan">
						YOUR RESERVATION
					</h1>
					<p className="text-blue">
						{booking.property.title} - {booking.property.address.city}
					</p>
					<p className="text-blue">
						{booking.property.address.street} {booking.property.address.number}
					</p>
					<p className="text-blue">
						{booking.property.address.state} {booking.property.address.country}
					</p>
					<p className="text-blue">
						Check in: {booking.startDate} - Check out: {booking.endDate}
					</p>
					<p className="text-blue">Total USD: {booking.totalAmount}</p>
					<p className="text-blue">Status: {booking.status}</p>
				</div>
			) : (
				<div className="flex flex-col items-center w-full h-screen">
					<FadeLoader color="#54086B" />
				</div>
			)}
			{booking.totalAmount && <PaymentForm totalAmount={booking.totalAmount} />}
		</div>
	);
}

export default Reservations;
