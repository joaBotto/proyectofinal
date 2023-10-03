import React from "react";

const ImageModal = ({ image, onClose }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="relative max-w-screen-md p-4">
				<button
					onClick={onClose}
					className="absolute top-10 right-10 text-black cursor-pointer"
				>
					X
				</button>
				<img
					src={image.imageUrl}
					alt="Modal Image"
					className="max-w-full h-auto rounded-lg shadow-md"
				/>
			</div>
		</div>
	);
};

export default ImageModal;
