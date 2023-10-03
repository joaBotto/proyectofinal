import { Link } from "react-router-dom";

const Card = ({
	_id,
	title,
	description,
	price,
	images,
	location,
	bedrooms,
}) => {
	console.log("card", _id);
	return (
		<div className="">
			<div className="px-4 py-5 sm:px-6">
				<Link to={`/detail/${_id}`}>
					<img src={images.imageUrl} className="rounded-xl shadow-md" />
					<h3 className="pt-4 text-lg leading-6 font-medium text-indigo-950">
						{title}
					</h3>
				</Link>
			</div>
			<div className="border-t">
				<dl>
					<div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-indigo-950">Price</dt>
						<dd className="mt-1 text-sm text-indigo-950 sm:mt-0 sm:col-span-2">
							{price}
						</dd>
						<dt className="text-sm font-medium text-indigo-950">Location</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{location}
						</dd>
						<dt className="text-sm font-medium text-indigo-950">
							Number of Bedrooms
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
							{bedrooms}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default Card;
