import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//! ImageGallery va a estar en otro componente, la idea es importarlo y usarlo en el detail
// const ImageGallery = ({ images }) => {
// 	return (
// 		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 			{images.map((image, i) => (
// 				<img
// 					key={i}
// 					src={image}
// 					alt={`Image ${i + 1}`}
// 					className="w-full h-auto rounded-lg shadow-lg"
// 				/>
// 			))}
// 		</div>
// 	);
// };

const Detail = () => {
	const { id } = useParams();
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(getPropertyDetail(id));
	// 	return () => {
	// 		dispatch(cleanDetail());
	// 	};
	// }, [dispatch, id]);
	//const property = useSelector((state) => state.getPropertyDetail);

	return (
		<div>
			{property.name ? (
				<div>
					<h2 className="text-xl font-semibold text-gray-800">
						{property.title}
					</h2>
					{/* <ImageGallery images={property.images} /> */}
					<p>{property.address.state}</p>
					<p>{property.address.street}</p>
					<p>{property.address.city}</p>
					<p className="text-gray-600">{property.description}</p>
					<div className="mt-4 flex items-center justify-between">
						<p className="text-gray-700">${property.price}</p>
						<p className="text-gray-700">
							{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms
						</p>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Detail;
