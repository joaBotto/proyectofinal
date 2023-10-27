import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import MyBookingCard from "./MyBookingCard";
import { getUserById } from "../../redux/actions";
import axios from "axios";

function Bookings() {
	const user = useSelector((state) => state.user);
	const allBookings = useSelector((state) => state.allBookings);

	const name = user.name.toUpperCase();
	const dispatch = useDispatch();

	const [myBookings, setMyBookings] = useState([]);

	useEffect(() => {
		dispatch(getUserById(user._id));
	}, [allBookings]);

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const bookingPromises = user.bookings.map((booking) =>
					axios.get(`http://localhost:3001/bookings/${booking}`)
				);
				const bookingResponses = await Promise.all(bookingPromises);
				const bookingData = bookingResponses.map((response) => response.data);
				setMyBookings(bookingData);
			} catch (error) {
				console.error("Error fetching user bookings: ", error);
			}
		};

		fetchBookings();
	}, [allBookings]);

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="ml-6 flex flex-col relative">
				<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
					{name}, FIND YOUR BOOKINGS
				</h1>
			</div>
			<div className="w-full">
				{myBookings.length > 0 ? (
					myBookings.map((booking) => (
						<MyBookingCard booking={booking} key={booking._id} />
					))
				) : (
					<div className="flex flex-col justify-center items-center mt-10">
						<h1 className="text-3xl text-center font-bold text-violet mb-10 font-onest">
							<br /> No bookings done yet!
						</h1>
					</div>
				)}
			</div>
			<div className="p-0">
				<Footer />
			</div>
		</div>
	);
}

export default Bookings;
