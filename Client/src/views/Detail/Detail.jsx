import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import NavBarSimple from "../../components/NavBar/NavBarWithoutImage";
import ImageCarousel from "../../components/Card/ImageCarousel";
import ImageGalleryModal from "./Modal";

const Detail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPropertyDetail(id));
	}, [dispatch, id]);

	const property = useSelector((state) => state.propertyDetail);
	const [isModalOpen, setIsModalOpen] = useState(false); // State for opening/closing the modal
	const [selectedImage, setSelectedImage] = useState(null);

	const openModal = (image) => {
		setSelectedImage(image);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedImage(null);
		setIsModalOpen(false);
	};

	console.log("property detail", property);

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBarSimple />
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
								<div className="w-full flex flex-row flex-wrap justify-start overflow-scroll">
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
								Published X days ago
							</p>
							<p className="flex justify-end text-4xl text-blue font-onest font-extrabold mr-2 pr-44 py-3">
								U$D {property.price}
							</p>
							<div className="w-full flex flex-row pr-44">
								<div className="w-1/2 flex flex-col mr-11">
									<p className="text-3xl text-blue font-onest font-extrabold pt-3">
										DESCRIPTION
									</p>
									<p className="text-md text-blue font-noto text-justify font-light pb-3">
										{property.description}
									</p>
								</div>
								<div className="w-1/4 border-2 border-cyan rounded-xl mt-3">
									<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
										PROPERTY OWNER
									</p>
									<p className="text-md text-blue font-noto text-justify font-light pb-3 px-5">
										{property.owner.name}
									</p>
								</div>
								<div className="w-1/4 border-2 border-cyan rounded-xl  ml-3 mt-3">
									<p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
										PROPERTY REVIEWS
									</p>
									<p className="text-md text-blue font-noto text-justify font-light pb-3 px-5">
										{property.owner.name}
									</p>
								</div>
							</div>
							<div className="w-full flex flex-row mt-8 pr-44">
								<div className="w-1/2">
									<p className="text-4xl text-blue font-onest font-extrabold py-3">
										LOCATION
									</p>
									<p className="text-md mt-1 pb-0 mb-0 font-noto font-medium text-blue uppercase">
										<FontAwesomeIcon icon={faLocationDot} />{" "}
										{property.address.state}, {property.address.city}
									</p>
								</div>
								<div className="w-1/2">
									<p className="text-4xl text-blue font-onest font-extrabold pt-3">
										OTHER CHARACTERISTICS
									</p>
									<p className="text-md text-blue font-noto text-justify font-light pb-3 px-5"></p>
								</div>
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
