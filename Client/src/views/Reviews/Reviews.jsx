import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProperty, getBooking } from "../../redux/actions";
import { Avatar, Rate, Input, Steps, Alert, Space, Spin } from "antd";
const { TextArea } = Input;
import { HeartFilled } from "@ant-design/icons";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Reviews() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getBooking(id));
	}, [dispatch, id]);
	const booking = useSelector((state) => state.bookingDetail);
	const guest = useSelector((state) => state.bookingDetail.guest);

	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const property = booking.property;

	const [review, setReview] = useState({
		calification: 0,
		description: "",
		guestId: "",
		guestName: "",
		guestImage: "https://placehold.co/600x400",
	});

	useEffect(() => {
		if (guest) {
			setReview({
				...review,
				guestId: guest._id,
				guestName: guest.name,
				guestImage: guest.image || "https://placehold.co/600x400",
			});
		}
	}, [guest]);

	const handleChange = (e) => {
		setReview({
			...review,
			[e.target.name]: e.target.value,
		});
	};

	const handleRatingChange = (field, value) => {
		setReview({
			...review,
			[field]: value,
		});
	};

	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		let updatedProperty = {};
		if (property.reviews) {
			updatedProperty = {
				...property,
				reviews: [...property.reviews, review],
			};
		} else {
			updatedProperty = {
				...property,
				reviews: [review],
			};
		}
		// console.log("esto mando al back", updatedProperty);
		await dispatch(editProperty(updatedProperty));
		setIsLoading(true);
		setTimeout(() => {
			setSuccess(true);
			setIsLoading(false);
		}, 3000);
		setTimeout(() => {
			navigate(`/`);
		}, 7000);
	};

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			{booking && property ? (
				<div>
					<NavBar />
					<div className="w-full">
						<div className="ml-6 flex flex-col relative">
							<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
								Welcome back {review?.guestName} <HeartFilled />
							</h1>
							<h1 className="absolute bottom-[50px] text-3xl font-onest font-extrabold uppercase text-white">
								Hope you had the best stay at <br /> {property?.title}!
							</h1>
						</div>
						<p className="ml-6 pt-10 text-4xl text-center font-onest font-extrabold uppercase text-cyan">
							Your feedback is very important to us!
						</p>
						<div className="flex justify-center">
							<div className="p-10 w-3/4 m-10 shadow rounded-2xl flex flex-row bg-violet bg-opacity-10">
								<div className="w-1/2 p-5 rounded-2xl">
									<div className="overflow-hidden w-full shadow-md rounded-2xl">
										<img
											src={property?.images && property?.images[0].imageUrl}
											alt="property"
											className="object-cover rounded-2xl"
										/>
									</div>
								</div>
								<div className="flex flex-col w-1/2">
									<div className="flex flex-col md:flex-row items-center pl-5 mt-5">
										<div className="flex">
											{review.guestImage && (
												<Avatar
													size={{
														xs: 24,
														sm: 32,
														md: 40,
														lg: 64,
														xl: 80,
														xxl: 100,
													}}
													src={review.guestImage}
												/>
											)}
										</div>
										{review && (
											<p className="pl-1 font-noto text-blue text-xl">
												{review.guestName}
											</p>
										)}
										<p className="pl-1 font-noto text-blue text-xl">
											{" "}
											{booking.guest?.lastName}
										</p>
									</div>

									<form onSubmit={handleReviewSubmit}>
										<p className="font-onest font-bold px-6 text-md text-blue pt-5">
											How would you score your experience at this property?
										</p>
										<div className="flex flex-row items-center justify-between px-6 pb-5">
											<label>
												<Rate
													character={<HeartFilled />}
													allowHalf
													onChange={(value) =>
														handleRatingChange("calification", value)
													}
													value={review.calification}
													className="text-pink text-4xl"
												/>
											</label>
											<p className="font-onest font-extrabold text-2xl text-pink">
												{review.calification} <HeartFilled />
											</p>
										</div>
										<p className="font-onest font-bold px-6 text-md text-blue pt-5">
											Give more feedback for us to publish on the property's
											details!
										</p>
										<p className="font-noto font-thin px-6 text-sm text-blue">
											(The property's owner can delete offensive comments)
										</p>
										<div className="flex flex-row items-center justify-between px-6 py-5">
											<label>
												<TextArea
													showCount
													autoSize={{ minRows: 2, maxRows: 6 }}
													maxLength={50}
													name="description"
													rows="4"
													cols="50"
													placeholder="Add a review..."
													value={review.description}
													onChange={handleChange}
												/>
											</label>
										</div>
										<div className="flex w-full justify-end pt-10 mt-10">
											{isLoading && (
												<div className="flex flex-col justify-center items-center">
													<Spin size="large" />
												</div>
											)}
											{!isLoading && !success && (
												<button
													type="submit"
													disabled={!review.calification || !review.description}
													className={`bg-violet py-2 px-4 rounded-full shadow font-onest text-white ${
														!review.calification || !review.description
															? "bg-opacity-5 cursor-not-allowed"
															: "hover:bg-pink cursor-pointer"
													}`}
												>
													Submit Review
												</button>
											)}
											{success && (
												<div className="flex flex-col justify-center items-center">
													<Space direction="vertical" style={{ width: "100%" }}>
														<Alert
															message="Thank you for your feedback!"
															description="Redirecting..."
															type="success"
															showIcon
														/>
													</Space>
												</div>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="p-0">
						<Footer />
					</div>
				</div>
			) : (
				<div className="flex justify-center items-center">
					<Spin size="large" />
				</div>
			)}
		</div>
	);
}

export default Reviews;
