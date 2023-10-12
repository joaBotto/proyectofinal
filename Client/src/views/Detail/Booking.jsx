import React, { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const Booking = ({ property }) => {
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalDays, setTotalDays] = useState(0);

	const [selectedDates, setSelectedDates] = useState(null);

	const calculateDaysInBetween = (startDate, endDate) => {
		const start = new Date(startDate.format("YYYY-MM-DD"));
		const end = new Date(endDate.format("YYYY-MM-DD"));
		const daysInBetween = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
		setTotalDays(daysInBetween);
		setTotalAmount(daysInBetween * property.price);
		return daysInBetween;
	};

	const handleDateChange = ([startDate, endDate]) => {
		console.log("From: ", startDate, "To:", endDate);
		if (startDate && endDate) {
			const daysInBetween = calculateDaysInBetween(startDate, endDate);
			console.log("Days in between:", daysInBetween);
		}
		setSelectedDates([startDate, endDate]);
	};

	const clearValues = () => {
		setTotalAmount(0);
		setTotalDays(0);
		setSelectedDates(null);
	};
	console.log(property.availableDays[property.availableDays.length - 1]);

	return (
		<div className="flex flex-col w-1/2 items-end pl-7">
			<div className="flex flex-col justify-start pb-11 mr-5">
				<p className="text-4xl text-blue font-onest text-right font-extrabold pb-3">
					SELECT DATES
				</p>
				<DatePicker.RangePicker
					format="DD-MM-YYYY"
					onChange={handleDateChange}
					value={selectedDates}
					className="rounded-full py-2 border-2 border-cyan font-onest text-blue"
					disabledDate={(current) =>
						current &&
						(current < moment(property.availableDays[0]) ||
							current >
								moment(
									property.availableDays[property.availableDays.length - 1]
								))
					}
				/>
			</div>
			<div className="flex flex-row justify-between items-center w-full text-left mb-4 mr-4">
				<div className="flex">
					<p className="text-2xl text-blue font-onest font-extrabold px-3">
						DAYS:
					</p>
					<p className="text-2xl text-cyan font-onest font-extrabold">
						{totalDays}
					</p>
				</div>
				<div className="flex">
					<p className="text-2xl text-blue font-onest font-extrabold px-3">
						TOTAL:
					</p>
					<p className="text-2xl text-cyan font-onest font-extrabold">
						U$D {totalAmount.toFixed(2)}
					</p>
				</div>
				<button
					onClick={clearValues}
					className="rounded-full bg-blue py-1 flex flex-col hover:bg-cyan"
				>
					Clear All
				</button>
			</div>
		</div>
	);
};

export default Booking;
