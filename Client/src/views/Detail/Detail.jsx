import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import logo from "../../assets/img/logo.png";

const Detail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPropertyDetail(id));
	}, [dispatch, id]);

	const property = useSelector((state) => state.propertyDetail);
	console.log("property", property);

	return (
		<div className="bg-white w-screen h-screen">
			{property && property.title ? (
				<div className="w-full px-10 py-20">
					<div className="w-full flex justify-between">
						<div>
							<h1 className="text-5xl font-onest font-extrabold uppercase text-cyan">
								{property.title}
							</h1>{" "}
						</div>
						<div>
							<button className="flex justify-end text-white bg-transparent rounded-full">
								<Link
									to="/"
									className="mt-1 mr-2 justify-center text-blue font-onest font-semibold"
								>
									RETURN
								</Link>
								<FontAwesomeIcon
									icon={faHouse}
									className="bg-cyan text-blue  py-2 px-2 rounded-full justify-center shadow-lg"
								/>
							</button>
						</div>
					</div>
					<div className="w-full flex justify-around pt-10">
						<div className="w-1/2"></div>

						<div className="w-1/2">
							<p className="text-blue font-onest font-bold underline pb-3">
								SAVE PROPERTY
							</p>
							<p className="text-blue font-noto font-bold pb-3">
								Published X days ago
							</p>
							<p className="text-4xl text-blue font-onest font-extrabold pt-3">
								U$D {property.price}
							</p>
							<div className="propertyOwner"></div>
							<div className="propertyReview"></div>
						</div>
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Detail;
