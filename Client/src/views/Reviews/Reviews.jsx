import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProperty } from "../../redux/actions";
import { Avatar, Rate, Input, Result } from "antd";
const { TextArea } = Input;
import { HeartFilled } from "@ant-design/icons";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Reviews() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [property, setProperty] = useState({});
	const user = useSelector((state) => state.user);
	const [review, setReview] = useState({
		calification: 0,
		description: "",
		guestId: user._id,
		guestName: user.name,
		guestImage: user.images[0] || "https://placehold.co/600x400",
	});

	const getPropertyDetail = async () => {
		try {
			const { data } = await axios.get(`/properties/${id}`);
			setProperty(data);
		} catch (error) {
			return console.log(error);
		}
	};

	console.log("User", user);
	console.log("Property", property);

	useEffect(() => {
		getPropertyDetail();
	}, [id]);

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
		console.log("esto mando al back", updatedProperty);
		dispatch(editProperty(updatedProperty));
	};

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="w-full">
				<div className="ml-6 flex flex-col relative">
					<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
						Welcome back {review.guestName} <HeartFilled />
					</h1>
					<h1 className="absolute bottom-[50px] text-3xl font-onest font-extrabold uppercase text-white">
						Hope you had the best stay at <br /> {property.title}!
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
									src={property.images && property.images[0].imageUrl}
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
								<p className="pl-1 font-noto text-blue text-xl">
									{review.guestName}
								</p>
								<p className="pl-1 font-noto text-blue text-xl">
									{" "}
									{user.lastName}
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
								</div>
							</form>
							{/* <Link to={`/detail/${id}`}>
								<Result
									status="success"
									title="Successfully Purchased Cloud Server ECS!"
									subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
								/>
							</Link> */}
						</div>
					</div>
				</div>
			</div>
			<div className="p-0">
				<Footer />
			</div>
		</div>
	);
}

export default Reviews;