import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faLocationDot,
	faBed,
	faBath,
	faRulerCombined,
	faWarehouse,
	faHourglassHalf,
	faFireBurner,
	faTemperatureLow,
	faCheck,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "../../components/Card/ImageCarousel";
import ImageGalleryModal from "./Modal";
import PropertyMap from "./PropertyMap";
import Booking from "./Booking";
import NavBar from "../../components/NavBar/NavBar";

const Detail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPropertyDetail(id));
	}, [dispatch, id]);

	const property = useSelector((state) => state.propertyDetail);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const openModal = (image) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedImage(null);
		setIsModalOpen(false);
	};

	const [showAmenities, setShowAmenities] = useState(true);

	const toggleCharacteristics = () => {
		setShowAmenities(!showAmenities);
	};

	console.log("property detail", property);

	const originalStartDate =
		property && property.availableDays && property.availableDays[0];
	const formattedStartDate = originalStartDate
		? new Date(originalStartDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "N/A";

	const originalEndDate =
		property &&
		property.availableDays &&
		property.availableDays[property.availableDays.length - 1];
	const formattedEndDate = originalEndDate
		? new Date(originalEndDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: "N/A";

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			{property && property.title ? (
				<div className="w-full px-10 mx-10 py-20">
					<div>
						<div className="w-full mb-7 flex justify-between">
							<div>
								<h1 className="text-5xl font-onest font-extrabold uppercase text-cyan">
									{property.title}
								</h1>
							</div>
							<div className="">
								<button className=" flex justify-end text-white bg-transparent rounded-full mr-6">
									<Link
										to="/"
										className="mt-1 mr-2 justify-center text-blue font-onest font-semibold"
									>
										RETURN
									</Link>
									<FontAwesomeIcon
										icon={faHouse}
										className="bg-cyan text-blue  py-2 px-2 rounded-full justify-center shadow-lg"
									/>
								</button>
							</div>
						</div>
						<div className="mb-5">
							<div className="flex flex-row h-[500px]">
								<div className="w-full overflow-hidden rounded-xl shadow-xl">
									<ImageCarousel images={property.images} />
								</div>
								<div className="w-full flex flex-row flex-wrap justify-start overflow-x-hidden overflow-y-scroll">
									<p className="ml-5 text-blue font-onest font-bold underline pb-3">
										♥︎SAVE PROPERTY
									</p>
									<div className="flex flex-row flex-wrap">
										{property.images.map((image, index) => (
											<div className="flex flex-row flex-wrap ">
												<img
													key={index}
													src={image.imageUrl}
													alt={`Thumbnail ${index + 1}`}
													className="h-[250px] w-[300px] cursor-pointer m-1 filter grayscale hover:grayscale-0 rounded-md"
													onClick={() => openModal(image)}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="w-full">
							<p className="text-blue font-noto font-bold pb-3">
								Available from {formattedStartDate || "null"} to{" "}
								{formattedEndDate || "null"}
							</p>
							<div className="w-1/2 h-10 grid grid-cols-3 gap-3 place-items-stretch">
								<div className="flex justify-center items-center rounded-md bg-cyan uppercase">
									<p className="text-sm text-blue text-center font-bold">
										<FontAwesomeIcon icon={faBed} className="mr-2" />{" "}
										{property.bedrooms} Bedroom/s
									</p>
								</div>
								<div className="flex justify-center items-center rounded-md bg-cyan uppercase">
									<p className="text-sm font-bold text-blue text-center">
										<FontAwesomeIcon icon={faBath} className="mr-2" />
										{property.bathrooms} Bathroom/s
									</p>
								</div>
								<div className="flex justify-center items-center rounded-md bg-cyan">
									<p className="text-sm font-bold text-blue text-center">
										<FontAwesomeIcon icon={faRulerCombined} />{" "}
										{property.amenities.covered_area} m²
									</p>
								</div>
							</div>
							<p className="flex justify-end text-4xl text-blue font-onest font-extrabold mr-2 pr-44 py-3">
								U$D {property.price}
							</p>
							<div className="w-full justify-center align-middle items-center flex flex-row pr-44">
								<div className="w-1/2 flex flex-col mr-11">
									<p className="text-3xl text-blue font-onest font-extrabold pt-3">
										DESCRIPTION
									</p>
									<p className="text-md text-blue font-noto text-justify font-light pb-3">
										{property.description}
									</p>
								</div>
								<div className="w-1/4 h-full border-2 border-cyan rounded-xl mt-3 pb-5">
									<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
										PROPERTY OWNER
									</p>
									<div className="flex flex-row justify-items-center pl-5">
										{property.owner.images > 0 ? (
											<img
												src={property.owner.images[0]}
												alt="Placeholder"
												className="rounded-full object-cover w-11 h-11"
											/>
										) : (
											<img
												src="https://via.placeholder.com/150"
												alt="Placeholder"
												className="rounded-full object-cover w-11 h-11"
											/>
										)}

										<p className="text-xs text-blue font-noto text-left font-light py-2 px-2">
											{property.owner.name} from {property.owner.city},{" "}
											{property.owner.country}
										</p>
									</div>
								</div>
								<div className="w-1/4 h-full border-2 border-cyan rounded-xl ml-3 mt-3">
									<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
										PROPERTY REVIEWS
									</p>
									<div className="flex items-center justify-start pb-5">
										<div className="flex flex-row justify-items-center pl-5">
											<img
												src="https://via.placeholder.com/150"
												alt="Placeholder"
												className="rounded-full object-cover w-11 h-11"
											/>
											<p className="text-xs text-blue font-noto text-left font-light pl-2 pt-2">
												"Lorem ipsum dolor sit amet consectetur adipisicing
												elit. Iste"
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="w-full flex flex-row mt-8 pr-44">
								<div className="w-1/2">
									<p className="text-4xl text-blue font-onest font-extrabold py-3">
										LOCATION
									</p>
									<p className="text-md mt-1 pb-0 mb-0 font-noto font-medium text-blue uppercase">
										<FontAwesomeIcon icon={faLocationDot} />{" "}
										{property.type || "Property"} in {property.address.state},{" "}
										{property.address.city}
									</p>
									{/* <div className="w-full h-[300px]">
										<PropertyMap property={property} />
									</div> */}
								</div>
								<div className="w-1/2 ml-7">
									<p className="text-4xl text-blue font-onest font-extrabold pt-3">
										OTHER CHARACTERISTICS
									</p>
									<div className="bg-blue bg-opacity-10 p-5 rounded-t-md flex flex-row ">
										<p
											className={`text-md font-bold text-blue font-onest cursor-pointer pr-5 ${
												showAmenities
													? "underline text-cyan cursor-pointer"
													: ""
											}`}
											onClick={() => setShowAmenities(true)}
										>
											AMENITIES
										</p>
										<p
											className={`text-md font-bold text-blue font-onest cursor-pointer  ${
												!showAmenities
													? "underline text-cyan cursor-pointer"
													: ""
											}`}
											onClick={() => setShowAmenities(false)}
										>
											ADDITIONAL FEATURES
										</p>
									</div>
									<div className="bg-blue bg-opacity-5 flex px-4 rounded-b-md py-5">
										{showAmenities ? (
											<div className="flex flex-col justify-start font-noto">
												<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
													<FontAwesomeIcon
														icon={faWarehouse}
														className="w-10"
													/>
													<p>
														Garage/Parking Spot:{" "}
														{property.amenities.garage ? "Yes" : "No"}
													</p>
												</div>
												<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
													<FontAwesomeIcon
														icon={faHourglassHalf}
														className="w-10"
													/>
													<p>Antiquity: {property.amenities.antique}</p>
												</div>
												<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
													<FontAwesomeIcon
														icon={faFireBurner}
														className="w-10"
													/>
													<p>
														Grill: {property.amenities.grill ? "Yes" : "No"}
													</p>
												</div>
												<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
													<FontAwesomeIcon
														icon={faTemperatureLow}
														className="w-10"
													/>
													<p>
														Heat/Cool System:{" "}
														{property.amenities.grill ? "Yes" : "No"}
													</p>
												</div>
											</div>
										) : (
											<div className="flex flex-col font-noto ">
												<p>
													{property.additional.swimmingpool ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Swimming Pool
												</p>
												<p>
													{property.additional.terrace ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Terrace
												</p>
												<p>
													{property.additional.balcony_patio ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Balcony
												</p>
												<p>
													{property.additional.patio ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Patio or Garden
												</p>
												<p>
													{property.additional.dining_room ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Dining Room
												</p>
												<p>
													{property.additional.washing_machine ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Washing Machine
												</p>
												<p>
													{property.additional.internet_wifi ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Internet and WiFi
												</p>
												<p>
													{property.additional.refrigerator ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Refigerator
												</p>
												<p>
													{property.additional.microwave ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Microwave
												</p>
												<p>
													{property.additional.coffee_maker ? (
														<FontAwesomeIcon icon={faCheck} className="w-5" />
													) : (
														<FontAwesomeIcon icon={faXmark} className="w-5" />
													)}
													Coffee Maker
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="w-full flex justify-end pr-44 pt-11">
								<Booking property={property} />
								{/* <Link to="/">
									<button className="disabled pt-2 pb-2 pr-10 pl-10 font-onest font-extrabold text-white bg-violet rounded-full hover:bg-pink">
										BOOK NOW
									</button>
								</Link> */}
							</div>
						</div>
						{isModalOpen && (
							<ImageGalleryModal
								images={property.images}
								selectedImage={selectedImage}
								onClose={closeModal}
							/>
						)}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Detail;
