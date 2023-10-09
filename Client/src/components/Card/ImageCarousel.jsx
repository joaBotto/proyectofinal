import { useLocation } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageCarousel = ({ images }) => {
	if (!images || images.length === 0) {
		return null;
	}
	const location = useLocation();

	return (
		<Carousel
			className="rounded-xl w-full"
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className="py-4 px-1 absolute inset-0 flex items-end justify-between bottom-0 left-0 right-0 z-50 gap-2 hover:border-transparent">
					<button
						className="cursor-pointer bg-transparent hover:border-transparent"
						onClick={() => setActiveIndex(activeIndex - 1)}
						disabled={activeIndex === 0}
					>
						<FontAwesomeIcon
							icon={faArrowLeft}
							className="text-sm transition ease-in-out delay-50 text-transparent p-2 hover:text-white hover:bg-white rounded-full hover:bg-opacity-75 hover:text-m duration-300"
						/>
					</button>
					{location.pathname === "/" &&
						new Array(length)
							.fill("")
							.map((_, i) => (
								<span
									key={i}
									className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
										activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
									}`}
									onClick={() => setActiveIndex(i)}
								/>
							))}
				<button
						className="cursor-pointer bg-transparent rounded-full hover:border-none"
						onClick={() => setActiveIndex(activeIndex + 1)}
						disabled={activeIndex === length - 1}
					>
						<FontAwesomeIcon
							icon={faArrowRight}
							className="text-sm transition ease-in-out delay-50 text-transparent p-2 hover:text-white hover:bg-white rounded-full hover:bg-opacity-75 hover:text-m duration-300"
						/>
					</button>
				</div>
			)}
		>
			{images.map((image, index) => (
				<img
					key={index}
					src={image?.imageUrl || ""}
					alt={`Property Image ${index}`}
					className="object-cover rounded-xl w-full h-full"
				/>
			))}
		</Carousel>
	);
};

export default ImageCarousel;
