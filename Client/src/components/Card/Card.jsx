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
	console.log("card", description);
	return (
		<div className="">
			<div className="px-4 pt-5 sm:px-6">
				<Link to={`/detail/${_id}`}>
					<div className="relative rounded-xl shadow-md overflow-hidden">
						<img
							src={images.imageUrl}
							alt={title}
							className="h-[300px] object-cover w-full"
						/>
					</div>
					<h3 className="pt-4 text-lg leading-6 font-extrabold text-indigo-950">
						{title}
					</h3>
				</Link>
			</div>
			<div className="ml-6 grid grid-rows-3 gap-y-2">
				<p className="text-sm mt-1 pb-0 mb-0 font-medium text-indigo-950">
					Where: {location}
				</p>
				<p className="text-3xl pt-0 font-bold text-indigo-950">U$D {price}</p>
				<div className="rounded-full bg-cyan-200 inline-block w-4/12">
					<p className="text-sm my-3 mx-3 font-medium text-indigo-950">
						Bedrooms: {bedrooms}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
