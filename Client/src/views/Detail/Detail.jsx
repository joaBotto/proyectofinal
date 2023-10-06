import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
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

	return (
		<div className="bg-white w-screen h-screen">
			<NavBarSimple />
			{property && property.title ? (
				<div className="w-full px-10 py-20">
					<div className="w-full flex justify-between">
						<div>
							<h1 className="text-5xl font-onest font-extrabold uppercase text-cyan">
								{property.title}
							</h1>
						</div>
						<div>
							<button className="flex justify-end text-white bg-transparent rounded-full">
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
					<div className="w-full flex justify-around pt-10">
						<div className="w-1/2 ml-2 mr-10">
							<div className="w-full h-2/3 overflow-hidden rounded-xl shadow-xl">
								<ImageCarousel images={property.images} />
							</div>
							<div className="w-full flex justify-between pt-2">
								<div className="flex w-full justify-start flex-wrap">
									{property.images.map((image, index) => (
										<div className="">
											<img
												key={index}
												src={image.imageUrl}
												alt={`Thumbnail ${index + 1}`}
												className="h-[150px] cursor-pointer m-1 filter grayscale hover:grayscale-0 rounded-md"
												onClick={() => openModal(image)}
											/>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="w-1/2">
							<p className="text-blue font-onest font-bold underline pb-3">
								♥︎SAVE PROPERTY
							</p>
							<p className="text-blue font-noto font-bold pb-3">
								Published X days ago
							</p>
							<p className="text-4xl text-blue font-onest font-extrabold pt-3">
								U$D {property.price}
							</p>
							<div className="propertyOwner"></div>
							<div className="propertyReview"></div>
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
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Detail;
