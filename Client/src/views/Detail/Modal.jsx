import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ImageGalleryModal = ({ images, onClose, selectedImage }) => {
	const [activeIndex, setActiveIndex] = useState(
		images.findIndex((image) => image === selectedImage)
	);

	const handlePrev = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const handleNext = () => {
		if (activeIndex < images.length - 1) {
			setActiveIndex(activeIndex + 1);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="p-4">
				<button
					onClick={onClose}
					className="bg-transparent relative bottom-0 left-[610px] text-white cursor-pointer transition-transform duration-300 hover:scale-110"
				>
					X
				</button>
				<div className="relative w-[600px] h-[600px]">
					<img
						src={images[activeIndex]?.imageUrl || ""}
						alt={`Property Image ${activeIndex + 1}`}
						className="object-cover rounded-xl w-full h-full"
					/>
				</div>
				<div className="relative top-2/4 flex justify-between w-full">
					<button
						onClick={handlePrev}
						className="text-lg bg-transparent transition-transform duration-300 hover:scale-110"
					>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className="text-lg transition ease-in-out delay-50 text-white hover:text-cyan hover:text-xl duration-300"
						/>
					</button>
					<button
						onClick={handleNext}
						className="text-lg bg-transparent transition-transform duration-300 hover:scale-110"
					>
						<FontAwesomeIcon
							icon={faArrowRight}
							className="text-lg transition ease-in-out delay-50 text-white hover:text-cyan hover:text-xl duration-300"
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageGalleryModal;
