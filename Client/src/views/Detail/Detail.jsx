import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";


const Detail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPropertyDetail(id));
		// return () => {
		// 	dispatch(cleanDetail());
		// };
	}, [dispatch, id]);
	const property = useSelector((state) => state.propertyDetail);
console.log(property)
	return (
		<div>
			{property && property.title ? (
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
