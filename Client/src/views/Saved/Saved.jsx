import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { FrownOutlined, HeartFilled } from "@ant-design/icons";
import NavBar from "../../components/NavBar/NavBar";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { updateUser } from "../../redux/actions";

function SavedProperties() {
	const user = useSelector((state) => state.user);
	const name = user.name.toUpperCase();

	return (
		<div className="bg-white w-screen h-screen overflow-x-hidden">
			<NavBar />
			<div className="ml-6 flex flex-col relative">
				<h1 className="absolute bottom-[120px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
					WELCOME {name}
				</h1>
				<h1 className="absolute bottom-[90px] text-3xl font-onest font-extrabold uppercase text-violet">
					FIND YOUR FAVOURITE PROPERTIES
				</h1>
			</div>
			<div className="w-full">
				<div className="ml-6 flex flex-col relative mt-10">
					<h1 className="flex align-middle ml-4 text-5xl font-onest font-extrabold uppercase text-cyan">
						<HeartFilled className="mr-3" />
						SAVED PROPERTIES
					</h1>
					<div className="w-full flex justify-end">
						<button className=" flex justify-end text-white bg-transparent rounded-full mr-6">
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
					{user.savedProperties.length === 0 ? (
						<div className="flex flex-col justify-center items-center mt-10">
							<h1 className="text-3xl text-center font-bold text-violet mb-10 font-onest">
								<HeartFilled className="pb-5" />
								<br /> No properties saved!
							</h1>
						</div>
					) : (
						<div className="p-4">
							<Cards properties={user.savedProperties} />
						</div>
					)}
				</div>
			</div>
			<div className="p-0">
				<Footer />
			</div>
		</div>
	);
}

export default SavedProperties;
