import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faBed,
	faBath,
	faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";

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
		<div className="flex-auto rounded-xl py-2">
			<div className="px-4 pt-5 sm:px-6">
				<div className="relative rounded-xl shadow overflow-hidden">
					<ImageCarousel images={images} />
				</div>
				<h3 className="pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase">
					{title?.slice(0, 20)}
				</h3>
			</div>
			<div className="mx-6 grid grid-rows-3 gap-y-2 font-onest">
				<p className="text-sm mt-1 pb-0 mb-0 font-medium text-blue">
					<FontAwesomeIcon icon={faLocationDot} /> {location}
				</p>
				<p className="text-3xl text-right mb-2 font-bold text-blue">
					U$D {price}
				</p>
				<div className="grid grid-cols-3 gap-3 place-items-stretch">
					<div className="flex justify-center items-center rounded-md bg-cyan">
						<p className="text-sm font-medium text-blue text-center">
							{bedrooms} <FontAwesomeIcon icon={faBed} />
						</p>
					</div>
					<div className="flex justify-center items-center rounded-md bg-cyan">
						<p className="text-sm font-medium text-blue text-center">
							{bathrooms} <FontAwesomeIcon icon={faBath} />
						</p>
					</div>
					<div className="flex justify-center items-center rounded-md bg-cyan">
						<p className="text-sm font-medium text-blue text-center">
							<FontAwesomeIcon icon={faRulerCombined} /> x m²
						</p>
					</div>
				</div>
			</div>
			<p className="mx-6 text-sm pb-0 mt-3 text-justify font-noto font-medium text-blue">
				{description?.slice(0, 100)}...
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
