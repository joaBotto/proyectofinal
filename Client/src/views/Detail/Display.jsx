import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faWarehouse,
	faHourglassHalf,
	faFireBurner,
	faTemperatureLow,
	faCheck,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

function DisplayCharacteristics({ property }) {
	const [showAmenities, setShowAmenities] = useState(true);

	const toggleCharacteristics = () => {
		setShowAmenities(!showAmenities);
	};
	return (
		<div className="w-1/2 ml-7">
			<p className="text-4xl text-blue font-onest font-extrabold pt-3">
				OTHER CHARACTERISTICS
			</p>
			<div className="bg-blue bg-opacity-10 p-5 rounded-t-md flex flex-row ">
				<p
					className={`text-md font-bold text-blue font-onest cursor-pointer pr-5 ${
						showAmenities ? "underline text-cyan cursor-pointer" : ""
					}`}
					onClick={() => setShowAmenities(true)}
				>
					AMENITIES
				</p>
				<p
					className={`text-md font-bold text-blue font-onest cursor-pointer  ${
						!showAmenities ? "underline text-cyan cursor-pointer" : ""
					}`}
					onClick={() => setShowAmenities(false)}
				>
					ADDITIONAL FEATURES
				</p>
			</div>
			<div className="bg-blue bg-opacity-5 flex px-4 rounded-b-md py-5">
				{showAmenities ? (
					<div className="flex flex-col justify-start font-noto">
						<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
							<FontAwesomeIcon icon={faWarehouse} className="w-10" />
							<p>
								Garage/Parking Spot: {property.amenities?.garage ? "Yes" : "No"}
							</p>
						</div>
						<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
							<FontAwesomeIcon icon={faHourglassHalf} className="w-10" />
							<p>Antiquity: {property.amenities.antique}</p>
						</div>
						<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
							<FontAwesomeIcon icon={faFireBurner} className="w-10" />
							<p>Grill: {property.amenities.grill ? "Yes" : "No"}</p>
						</div>
						<div className="flex flex-row items-center text-sm font-medium text-blue pb-4">
							<FontAwesomeIcon icon={faTemperatureLow} className="w-10" />
							<p>Heat/Cool System: {property.amenities.grill ? "Yes" : "No"}</p>
						</div>
					</div>
				) : (
					<div className="flex flex-col font-noto ">
						<p>
							{property.additional.swimmingpool ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Swimming Pool
						</p>
						<p>
							{property.additional.terrace ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Terrace
						</p>
						<p>
							{property.additional.balcony_patio ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Balcony
						</p>
						<p>
							{property.additional.patio ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Patio or Garden
						</p>
						<p>
							{property.additional.dining_room ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Dining Room
						</p>
						<p>
							{property.additional.washing_machine ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Washing Machine
						</p>
						<p>
							{property.additional.internet_wifi ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Internet and WiFi
						</p>
						<p>
							{property.additional.refrigerator ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Refigerator
						</p>
						<p>
							{property.additional.microwave ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Microwave
						</p>
						<p>
							{property.additional.coffee_maker ? (
								<FontAwesomeIcon icon={faCheck} className="w-5" />
							) : (
								<FontAwesomeIcon icon={faXmark} className="w-5" />
							)}
							Coffee Maker
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default DisplayCharacteristics;
