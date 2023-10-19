import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooking } from "../../redux/actions";
import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { FadeLoader } from "react-spinners";
import {
	LoadingOutlined,
	SmileOutlined,
	SolutionOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";

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
			<div className="flex w-full">
				<div className="flex justify-center align-middle w-full relative z-10">
					<Steps
						className="w-2/3 absolute bottom-20 bg-white rounded-full shadow-lg p-3 font-noto font-light"
						items={[
							{
								title: "Selected",
								status: "finish",
								icon: <HomeOutlined className="text-blue" />,
							},
							{
								title: "Reserved",
								status: "finish",
								icon: <SolutionOutlined className="text-blue" />,
							},
							{
								title: "Pay",
								status: "process",
								icon: <LoadingOutlined className="text-cyan" />,
							},
							{
								title: "Booked",
								status: "wait",
								icon: <SmileOutlined />,
							},
						]}
					/>
				</div>
			</div>
			{booking && booking.property ? (
				<div className="w-full">
					<div className="m-11 flex flex-col p-11 w-1/2 bg-gray-100 rounded-lg border border-gray-300 shadow-lg">
						<h1 className="text-4xl font-extrabold text-cyan mb-4 uppercase">
							YOUR RESERVATION
						</h1>
						<div className="mb-4">
							<p className="text-lg text-blue">
								<span className="font-extrabold">{booking.property.title}</span>{" "}
								- {booking.property.address.city}
							</p>
						</div>
						<div className="mb-4">
							<p className="text-lg text-blue">
								{booking.property.address.street}{" "}
								{booking.property.address.number}
							</p>
							<p className="text-lg text-blue">
								{booking.property.address.state}{" "}
								{booking.property.address.country}
							</p>
						</div>
						<div className="mb-4">
							<p className="text-lg text-blue">
								Check in: {booking.startDate} - Check out: {booking.endDate}
							</p>
						</div>
						<div className="mb-4">
							<p className="text-lg text-blue">
								Total USD: {booking.totalAmount}
							</p>
						</div>
						<div>
							<p className="text-lg text-blue">Status: {booking.status}</p>
						</div>
					</div>
					<div className="m-11 flex flex-col p-11 w-1/2 bg-gray-100 rounded-lg border border-gray-300 shadow-lg">
						<h1 className="text-4xl font-extrabold text-cyan mb-4 uppercase">
							PAYMENT METHOD
						</h1>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center w-full h-screen">
					<FadeLoader color="#54086B" />
				</div>
			)}
		</div>
	);
}

export default Reservations;
