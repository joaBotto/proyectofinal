import { Link } from "react-router-dom";

const Card = ({
	_id,
	title,
	description,
	price,
	images,
	location,
	bedrooms,
	bathrooms,
}) => {
	return (
		<div className="flex-auto bg-indigo-100 rounded-xl py-2">
			<div className="px-4 pt-5 sm:px-6">
				<Link to={`/detail/${_id}`}>
					<div className="relative rounded-xl  overflow-hidden">
						<img
							src={images.imageUrl || "No hay img disponible"}
							alt={title}
							className="h-[300px] object-cover w-full"
						/>
					</div>
					<h3 className="pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase">
						{title?.slice(0, 25)}
					</h3>
				</Link>
			</div>
			<div className="mx-6 grid grid-rows-3 gap-y-2 font-onest">
				<p className="text-sm mt-1 pb-0 mb-0 font-medium text-blue">
					@: {location}
				</p>
				<p className="text-3xl text-right mb-2 font-bold text-blue">
					U$D {price}
				</p>
				<div className="grid grid-cols-3 gap-3 place-items-stretch">
					<div className="flex justify-center items-center rounded-full bg-cyan">
						<p className="text-sm font-medium text-blue text-center">
							{bedrooms} Bedrooms
						</p>
					</div>
					<div className="flex justify-center items-center rounded-full bg-cyan">
						<p className="text-sm font-medium text-blue text-center">
							{bathrooms} Bathrooms
						</p>
					</div>
					<div className="flex justify-center items-center rounded-full bg-cyan">
						<p className="text-sm font-medium text-blue text-center">x m2</p>
					</div>
				</div>
			</div>
			<p className="mx-6 text-sm pb-0 mt-3 text-justify font-noto font-medium text-blue">
				{description?.slice(0, 70)}...
			</p>
			<Link to={`/detail/${_id}`}>
				<div className="flex justify-end items-center">
					<button className="bg-blue text-white font-onest font-light px-4 py-2 rounded-full mx-6 my-4 self-end hover:bg-pink">
						See more
					</button>
				</div>
			</Link>
		</div>
	);
};

export default Card;
