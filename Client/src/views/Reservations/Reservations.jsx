import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooking } from "../../redux/actions"; // Suponiendo que getBooking se usa para recuperar una sola reserva
import { useParams, Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FadeLoader } from "react-spinners";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function Reservations() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const booking = useSelector((state) => state.bookingDetail);

	console.log("SOY EL BOOKING DETAIL",booking);

	useEffect(() => {
		dispatch(getBooking(id));
	}, [dispatch, id]);

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="ml-6 flex flex-col relative">
				<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
					THANK YOU, {booking?.guest?.name}
				</h1>
				<h1 className="absolute bottom-[90px] text-3xl font-onest font-extrabold uppercase text-white">
					FIND HERE ARE YOUR BOOKING DETAILS
				</h1>
			</div>
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
					<h1 className="text-5xl font-onest font-extrabold uppercase text-cyan mb-10">
						PAYMENT CHECKOUT
					</h1>
					<div className="flex flex-row w-full">
						<div className="flex flex-col w-1/2 font-onest p-10 shadow-lg rounded-lg space-y-3">
							<p className="text-cyan font-bold text-xl">
								{booking.property.title} - {booking.property.address.city}
							</p>
							<p className="text-blue">
								{booking.property.address.street}{" "}
								{booking.property.address.number}
							</p>
							<p className="text-blue font-bold pt-6 text-2xl">YOUR STAY: </p>
							<p className="text-blue text-xl font-medium">
								Check in: {booking.startDate} - Check out: {booking.endDate}
							</p>
							<p className="text-blue text-xl font-medium ">
								Total USD: {booking.totalAmount}
							</p>
							<p className="text-blue text-xl font-medium ">
								Total Days: {booking.totalDays}
							</p>
							<p className="text-cyan">Status: {booking.status}</p>
							<div className="w-full h-full mt-3 pb-5">
								<p className="text-blue font-bold pt-6 pb-3 text-2xl">
									YOUR HOST:
								</p>
								<div className="flex flex-col md:flex-row items-center">
									<div className="flex  rounded-full">
										{booking.property?.owner?.image ? (
											<Avatar
												size={{
													xs: 24,
													sm: 32,
													md: 40,
													lg: 64,
													xl: 80,
													xxl: 100,
												}}
												src={booking.property.owner.image}
												className="border-2 border-cyan"
											/>
										) : (
											<Avatar
												size={{
													xs: 24,
													sm: 32,
													md: 40,
													lg: 64,
													xl: 80,
													xxl: 100,
												}}
												icon={<UserOutlined />}
												className="border-2 border-cyan"
											/>
										)}
									</div>
									<p className="text-sm text-blue text-left font-medium uppercase py-2 px-2">
										{booking.property?.owner.name} from{" "}
										{booking.property?.owner.city},{" "}
										{booking.property?.owner.country}
									</p>
									<p className="text-sm text-blue text-left font-medium py-2 px-2">
										CONTACT:
										<br /> {booking.property?.owner.email} <br />{" "}
										{booking.property?.owner.phoneNumber}{" "}
									</p>
								</div>
							</div>
						</div>
						<div className="flex w-full items-end">
							{booking.totalAmount && (
								<PaymentForm totalAmount={booking.totalAmount} />
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center w-full h-screen">
					<FadeLoader color="#54086B" />
				</div>
			)}
			<Footer />
		</div>
	);
}

export default Reservations;
