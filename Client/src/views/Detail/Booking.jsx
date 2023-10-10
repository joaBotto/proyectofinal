import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

const Booking = ({ property }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalDays, setTotalDays] = useState(0);

	const calculateTotalAmount = () => {
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			const diffTime = Math.abs(end - start);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			const calculatedTotal = diffDays * property.price;
			setTotalDays(diffDays);
			setTotalAmount(calculatedTotal);
			console.log("usd", start, end, diffTime, diffDays, calculatedTotal);
		} else {
			setTotalAmount(0);
		}
	};

	const handleStartDateChange = (date) => {
		setStartDate(date);
	};

  const handleEndDateChange = (date) => {
    setEndDate(date);
    calculateTotalAmount();
  };

<<<<<<< HEAD
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
=======
	return (
		<div className="flex flex-row justify-between items-center w-full ml-7">
			{/* Date selection */}
			<div className="flex flex-col justify-start mb-4 mr-5">
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
			<div className="flex content-start text-left mb-4">
				<p className="text-4xl text-blue font-onest font-extrabold px-3">
					DAYS:
				</p>
				<p className="text-4xl text-cyan font-onest font-extrabold pr-11">
					{totalDays}
				</p>
				<p className="text-4xl text-blue font-onest font-extrabold px-3">
					TOTAL:
				</p>
				<p className="text-4xl text-cyan font-onest font-extrabold">
					U$D {totalAmount.toFixed(2)}
				</p>
			</div>
		</div>
	);
>>>>>>> 261bd728661192d9eac7e471cfb9af4e22f1de22
};
export default Booking;
