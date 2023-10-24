import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faBed,
	faBath,
	faRulerCombined,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";
import {
	addPropertyToSaved,
	removePropertyFromSaved,
	updateUser,
} from "../../redux/actions";

const Card = ({
	_id,
	title,
	description,
	price,
	images,
	location,
	bedrooms,
	bathrooms,
	area,
}) => {
	const dispatch = useDispatch();
	const savedProperty = useSelector((state) => state.savedProperties);
	const user = useSelector((state) => state.user);
	const allproperties = useSelector((state) => state.allproperties);

	const handleSaveClick = () => {
		if (!savedProperty.find((property) => property._id === _id)) {
			// Buscar el objeto en allproperties por _id
			const propertyToAdd = allproperties.find(
				(property) => property._id === _id
			);

			if (propertyToAdd) {
				// Dispatch the action to add the property to the saved list
				console.log("Agregando a favoritos", _id);
				dispatch(addPropertyToSaved(_id));

				// Agregar el objeto al usuario
				const userEdited = {
					...user,
					savedProperties: [...user.savedProperties, propertyToAdd],
				};
				dispatch(updateUser(userEdited));
			}
		} else {
			console.log("Eliminando de favoritos", _id);
			dispatch(removePropertyFromSaved(_id));

			// Actualizar el usuario sin el objeto eliminado
			const userEdited = {
				...user,
				savedProperties: user.savedProperties.filter(
					(property) => property._id !== _id
				),
			};
			dispatch(updateUser(userEdited));
		}
	};

	const heartClasses = ``;
	const isSavedClass = savedProperty.find((property) => property._id === _id)
		? "text-cyan"
		: "";

	const combinedClasses = `${heartClasses} ${isSavedClass}`;

	return (
		<div className="flex-auto rounded-2xl py-2 bg-white bg-opacity-50 border-blue border-2 border-b-4 border-r-4">
			<div className="px-4 pt-5 sm:px-6 ">
				<button onClick={handleSaveClick} className={combinedClasses}>
					<FontAwesomeIcon
						icon={faHeart}
						size="2x"
						className="hover:text-cyan"
					/>
				</button>
				<div className="relative rounded-xl h-[300px] shadow overflow-hidden">
					<ImageCarousel images={images} />
				</div>
				<h3 className="pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase">
					{title?.slice(0, 30)}
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
							<FontAwesomeIcon icon={faRulerCombined} /> {area} m²
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
