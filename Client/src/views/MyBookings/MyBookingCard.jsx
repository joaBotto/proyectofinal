import React, { useEffect, useState } from "react";
import {
	UserOutlined,
	MailOutlined,
	WhatsAppOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
const MyBookingCard = ({ booking, key }) => {
	console.log(booking);
	const [bookingStatus, setBookingStatus] = useState([]);

	useEffect(() => {
		const parseDate = (dateString) => {
			const [day, month, year] = dateString.split("-");
			return new Date(`${year}-${month}-${day}`);
		};
		const currentDate = new Date();
		const endDate = parseDate(booking.endDate);
		const isFinished = endDate < currentDate;
		setBookingStatus(isFinished ? "Finished" : booking.status);
	}, [booking]);

	return (
		<div
			key={key}
			className="m-4 p-10 border shadow-lg font-onest border-gray-300 rounded-lg flex flex-col"
		>
			<h2 className="text-2xl font-bold text-cyan">
				{booking?.property.title}
			</h2>
			<div className="flex w-full flex-col">
				{booking.property && (
					<div className="flex w-full flex-row">
						<div className="w-1/2 mt-3 py-3">
							<img
								src={booking.property.images[0].imageUrl}
								className="rounded-xl shadow-lg"
								alt=""
							/>
						</div>
						<div className="w-1/2 mt-3 p-3">
							<p className="text-lg font-medium text-blue pt-3">
								{booking.property.type} in {booking.property.address.city},{" "}
								{booking.property.address.state}
							</p>
							<p className="text-lg font-medium pt-6 text-blue">Your Stay:</p>
							<p className="text-blue">Reservation #{booking._id}</p>
							<p className="text-blue">Check in: {booking.startDate}</p>
							<p className="text-blue">Check out: {booking.endDate}</p>
						</div>
					</div>
				)}
			</div>
			<div className="flex w-full flex-row justify-between pt-4">
				<p className="text-blue text-2xl font-bold">
					Total: U$D {booking.totalAmount}
				</p>
				<p className="text-blue text-2xl uppercase font-semibold">
					Status: {bookingStatus}
				</p>
			</div>
			<hr className="border-2 my-4" />
			<p className="text-lg font-bold text-blue">Your Host:</p>
			<div className="flex flex-col md:flex-row items-center p-5">
				<div className="flex w-full">
					<div className="flex rounded-full">
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
					<div className="w-full flex justify-between items-center">
						<p className="text-sm text-blue text-left font-medium uppercase py-2 px-2">
							{booking.property?.owner.name} from {booking.property?.owner.city}
							, {booking.property?.owner.country}
						</p>
						<p className="text-sm text-blue text-left font-medium py-2 px-2">
							CONTACT:
							<br /> <MailOutlined /> {
								booking.property?.owner.email
							} <br /> <WhatsAppOutlined />{" "}
							{booking.property?.owner.phoneNumber}{" "}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyBookingCard;
