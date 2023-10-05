import { Carousel } from "@material-tailwind/react";

const ImageCarousel = ({ images }) => {
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<Carousel
			className="rounded-xl w-full h-[300px]"
			navigation={({ setActiveIndex, activeIndex, length }) => (
				<div className="py-1 px-1 absolute flex justify-center bottom-4 left-0 right-0 z-50 gap-2">
					{new Array(length).fill("").map((_, i) => (
						<span
							key={i}
							className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
								activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
							}`}
							onClick={() => setActiveIndex(i)}
						/>
					))}
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
