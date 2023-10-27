import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	addNewBooking,
	getAllBookings,
	editPropertyAvailability,
} from "../../redux/actions";
import moment from "moment";
import { DatePicker } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
	LoadingOutlined,
	SmileOutlined,
	CreditCardOutlined,
	HomeOutlined,
	SolutionOutlined,
} from "@ant-design/icons";
import { Steps, Alert, Space, Spin } from "antd";

function BookingDetails({ property }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [totalAmount, setTotalAmount] = useState(0);
	const [totalDays, setTotalDays] = useState(0);
	const [selectedDates, setSelectedDates] = useState(null);
	const [reservationDetails, setReservationDetails] = useState(false);
	const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [updatedAvailableDates, setUpdatedAvailableDates] = useState(
		property.availableDays
	);
	const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);

	useEffect(() => {
		setUpdatedAvailableDates(property.availableDays);
	}, [property]);

	const calculateDaysInBetween = (startDate, endDate) => {
		const start = new Date(startDate.format("YYYY-MM-DD"));
		const end = new Date(endDate.format("YYYY-MM-DD"));
		const daysInBetween = Math.round((end - start) / (1000 * 60 * 60 * 24));

		if (daysInBetween < 1) {
			setTotalDays(0);
			setTotalAmount(0);
			setReservationDetails(false);
			setIsErrorModalVisible(true);
		} else {
			setTotalDays(daysInBetween);
			setTotalAmount(daysInBetween * property.price);
			setReservationDetails(true);
			setIsErrorModalVisible(false);
		}
		return daysInBetween;
	};

	const handleDateChange = ([startDate, endDate]) => {
		if (startDate && endDate) {
			const daysInBetween = calculateDaysInBetween(startDate, endDate);
			setSelectedDates([startDate, endDate]);
		} else {
			setTotalDays(0);
			setTotalAmount(0);
			setReservationDetails(false);
		}
	};

	const bookings = useSelector((state) => state.bookings);
	const lastBookingId = bookings?.map((booking) => booking._id);
	const bookingId =
		bookings?.length > 0 ? lastBookingId[lastBookingId.length - 1] : "";

	const guest = useSelector((state) => state.user);
	const [isReservationVisible, setReservationVisible] = useState(false);

	const updatePropertyAvailability = (property, startDate, endDate) => {
		const updatedAvailableDays = property.availableDays.filter((date) => {
			const currentDate = new Date(date);
			return currentDate < startDate || currentDate > endDate;
		});

		setUpdatedAvailableDates(updatedAvailableDays);
		dispatch(editPropertyAvailability(property._id, updatedAvailableDays));
	};

	const handleBookNow = async () => {
		try {
			if (selectedDates && totalAmount > 0) {
				const start = new Date(selectedDates[0]);
				const end = new Date(selectedDates[1]);
				updatePropertyAvailability(property, start, end);
				const startDate = moment(start).format("DD-MM-YYYY");
				const endDate = moment(end).format("DD-MM-YYYY");

				const bookingDetails = {
					startDate: startDate,
					endDate: endDate,
					guest: guest,
					owner: property?.owner,
					property: property,
					totalDays: totalDays,
					totalAmount: totalAmount,
					isPayed: false,
					transactionId: "",
					status: "reserved",
				};
				await dispatch(addNewBooking(bookingDetails));
				await dispatch(getAllBookings());
				setIsLoading(true);
				setTimeout(() => {
					setReservationVisible(true);
					setIsReservationConfirmed(true);
					setIsLoading(false);
				}, 3000);
				setTimeout(() => {
					navigate(`/detail/reservations/${bookingId}`);
				}, 7000);
			}
		} catch (error) {
			setError(true);
		}
	};

	const clearValues = () => {
		setTotalAmount(0);
		setTotalDays(0);
		setSelectedDates(null);
		setReservationVisible(false);
		setReservationDetails(false);
		setIsReservationConfirmed(false);
		setIsErrorModalVisible(false);
		setError(false);
	};

	return (
		<div className="w-full flex flex-col items-end justify-end pt-11">
			<div className="flex flex-col w-2/3 items-end pl-7">
				<div className="flex flex-col justify-start pb-5 mr-5">
					<p className="text-4xl text-blue font-onest text-right font-extrabold pb-3">
						SELECT DATES
					</p>
					<div className="flex">
						<DatePicker.RangePicker
							format="DD-MM-YYYY"
							onChange={handleDateChange}
							value={selectedDates}
							className="rounded-full py-1 border-2 border-cyan font-onest text-blue"
							disabledDate={(current) =>
								current &&
								!updatedAvailableDates.some((date) =>
									current.isSame(moment(date), "day")
								)
							}
							showToday={true}
							suffixIcon={null}
							clearIcon={null}
						/>
						<button
							onClick={clearValues}
							className="flex flex-col justify-center pl-2"
						>
							<CloseCircleOutlined className=" text-gray-600 text-xl hover:text-cyan" />
						</button>
					</div>
				</div>
			</div>
			{isErrorModalVisible && (
				<div>
					<Space direction="vertical" style={{ width: "100%" }}>
						<Alert
							message="Not Allowed"
							description="Please choose at least one night for the stay in this property!"
							type="error"
							showIcon
						/>
					</Space>
				</div>
			)}
			{selectedDates && !isReservationVisible && !isErrorModalVisible ? (
				<div className="flex justify-center align-middle w-full">
					<Steps
						className="w-full rounded-full p-3 font-noto font-light"
						items={[
							{
								title: "Selected",
								status: "finish",
								icon: <HomeOutlined className="text-blue" />,
							},
							{
								title: "Reserve",
								status: "process",
								icon: <LoadingOutlined className="text-cyan" />,
							},
							{
								title: "Pay",
								status: "wait",
								icon: <CreditCardOutlined />,
							},
							{
								title: "Booked",
								status: "wait",
								icon: <SmileOutlined />,
							},
						]}
					/>
				</div>
			) : selectedDates && isReservationVisible ? (
				<div className="flex justify-center align-middle w-full">
					<Steps
						className="w-full rounded-full p-3 font-noto font-light"
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
								status: "wait",
								icon: <CreditCardOutlined className="text-cyan" />,
							},
							{
								title: "Booked",
								status: "wait",
								icon: <SmileOutlined />,
							},
						]}
					/>
				</div>
			) : (
				<></>
			)}
			{reservationDetails && (
				<div className="w-2/3 flex flex-col justify-start items-start text-left my-4 mr-4">
					<p className="text-4xl text-blue font-onest text-right font-extrabold">
						RESERVATION DETAILS
					</p>
					<div className="bg-blue bg-opacity-5 rounded-md shadow-lg flex flex-col justify-between items-center w-full text-left mb-4 mr-4">
						<div className="p-5 flex flex-row w-full justify-between">
							<div className="">
								<p className="text-2xl text-blue font-onest font-extrabold">
									{property.title}
								</p>
								<p className="text-md text-cyan font-noto font-extrabold ">
									Check In:{" "}
									{selectedDates &&
										selectedDates[0].format("dddd, MMMM Do YYYY")}
								</p>
								<p className="text-md text-cyan font-noto font-extrabold ">
									Check Out:{" "}
									{selectedDates &&
										selectedDates[1].format("dddd, MMMM Do YYYY")}
								</p>
							</div>
							<div className=" flex px-5">
								<p className="text-2xl text-blue font-onest font-extrabold px-3">
									DAYS:
								</p>
								<p className="text-2xl text-cyan font-onest font-extrabold">
									{totalDays}
								</p>
							</div>
							<div className="flex px-5">
								<p className="text-2xl text-blue font-onest font-extrabold px-3">
									TOTAL:
								</p>
								<p className="text-2xl text-cyan font-onest font-extrabold">
									U$D {totalAmount.toFixed(2)}
								</p>
							</div>
						</div>
						<div className="w-full flex flex-col items-end pr-8">
							{!isReservationVisible && (
								<button
									onClick={selectedDates ? handleBookNow : null}
									disabled={!selectedDates || isReservationConfirmed}
									className={`rounded-full text-white font-onest py-1 px-3 flex flex-col ${
										!selectedDates ? " bg-gray-500 " : "bg-blue hover:bg-cyan"
									}`}
								>
									CHECKOUT
								</button>
							)}
						</div>
						<div className="flex flex-col w-full p-5">
							{isLoading && (
								<div className="flex flex-col justify-center items-center">
									<Spin size="large" />
								</div>
							)}
							{isReservationVisible && (
								<div>
									<p className="text-2xl text-right text-blue font-onest font-extrabold px-3 uppercase">
										Your reservation has been confirmed!
									</p>
									<p className="text-xl text-right text-cyan font-onest uppercase font-bold px-3">
										Reservation Number: #{bookingId}
									</p>
									<Space direction="vertical" style={{ width: "100%" }}>
										<Alert
											message="Redirecting to Check Out!"
											description="Please do not leave or refresh page..."
											type="warning"
											showIcon
										/>
									</Space>
								</div>
							)}
							{error && (
								<div>
									<p className="text-2xl text-right text-blue font-onest font-extrabold px-3 uppercase">
										There was an error with your reservation!
									</p>
									<p className="text-xl text-right text-cyan font-onest uppercase font-bold px-3">
										Please try again!
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
			<div className="flex flex-col justify-start pb-11 mr-1"></div>
		</div>
	);
}
export default BookingDetails;
