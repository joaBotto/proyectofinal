import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

function Bookings() {
	const bookings = [
		"65397e6736f28400fce2fd3b",
		"65397ef6dd6c123d9ebfa44b",
		"65397fcedd6c123d9ebfa4ae",
		"653980b51764928d14c9ad98",
	];
	const user = useSelector((state) => state.user);
	const name = user.name.toUpperCase();
	const booking = useSelector((state) => state.bookingDetail);
	console.log(user);
	console.log(booking);
	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="ml-6 flex flex-col relative">
				<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
					{name}, FIND YOUR BOOKINGS
				</h1>
			</div>
			<div className="w-full"></div>
			<div className="p-0">
				<Footer />
			</div>
		</div>
	);
}

export default Bookings;
