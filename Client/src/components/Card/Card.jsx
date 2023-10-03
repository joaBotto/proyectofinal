import { Link } from "react-router-dom";


const Card = ({ _id, title, description, price, images }) => {
	console.log("card", _id)
	return (
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<Link to={`/detail/${_id}`}>
				<h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
				{/* <img src={images.imageUrl}/> */}
				</Link>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Price</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{price}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default Card;
