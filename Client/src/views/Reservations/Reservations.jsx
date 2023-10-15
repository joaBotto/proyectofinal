import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBooking } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";

const BookingSystem = ({ selectedDates, totalAmount }) => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const guest = useSelector((state) => state.user);
	const property = id;
	const owner = useSelector((state) => state.properties.owner);

	console.log("guest", guest);
	console.log("property", property);
	console.log("owner", owner);

	const handleBookNow = () => {
		if (selectedDates && totalAmount > 0) {
			const newBooking = {
				startDate: selectedDates[0].format("YYYY-MM-DD"),
				endDate: selectedDates[1].format("YYYY-MM-DD"),
				owner: owner._id,
				guest: guest._id,
				property: property._id,
				totalDays,
				totalAmount,
			};
			dispatch(addNewBooking(newBooking));
			console.log(newBooking);
		}
	};

	return (
		<div className="bg-transparent">
			<button
				onClick={handleBookNow}
				className="rounded-full text-white font-onest bg-blue py-1 flex flex-col hover-bg-cyan"
			>
				BOOK NOW
			</button>
		</div>
	);
};
export default BookingSystem;
