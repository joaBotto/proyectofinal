import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

const Booking = ({ property }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [totalAmount, setTotalAmount] = useState(0);

	const calculateTotalAmount = () => {
		if (startDate && endDate) {
			const oneDay = 24 * 60 * 60 * 1000;
			const numberOfDays = Math.round((endDate - startDate) / oneDay);

			const monthlyPrice = property.price;
			console.log("prop in booking", property);
			const dailyPrice = monthlyPrice / 30;

			const calculatedTotal = dailyPrice * numberOfDays;
			console.log(
				"calcs",
				oneDay,
				numberOfDays,
				monthlyPrice,
				dailyPrice,
				calculatedTotal
			);
			setTotalAmount(calculatedTotal);
		} else {
			setTotalAmount(0);
		}
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
		calculateTotalAmount();
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
		calculateTotalAmount();
	};

	return (
		<div className="w-1/2 ml-7">
			{/* Date selection */}
			<div className="mb-4">
				<p className="text-4xl text-blue font-onest font-extrabold pb-3">
					SELECT DATES
				</p>
				<div className="flex flex-row justify-start">
					<div className="mr-4">
						<p className="text-md text-blue font-onest">Check-In:</p>
						<DatePicker
							selected={startDate}
							onChange={handleStartDateChange}
							minDate={new Date()}
							dateFormat="yyyy-MM-dd"
							className="border-2 border-cyan text-blue rounded-lg px-3 py-2"
						/>
					</div>
					<div>
						<p className="text-md text-blue font-onest">Check-Out:</p>
						<DatePicker
							selected={endDate}
							onChange={handleEndDateChange}
							minDate={startDate || new Date()}
							dateFormat="yyyy-MM-dd"
							className="border-2 border-cyan text-blue rounded-lg px-3 py-2"
						/>
					</div>
				</div>
			</div>
			{/* Total amount */}
			<div className="mb-4">
				<p className="text-4xl text-blue font-onest font-extrabold pb-3">
					TOTAL AMOUNT
				</p>
				<p className="text-2xl text-blue font-onest font-extrabold">
					U$D {totalAmount.toFixed(2)}
				</p>
			</div>
		</div>
	);
};
export default Booking;
