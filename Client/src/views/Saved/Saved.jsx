import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { HeartFilled } from "@ant-design/icons";
import NavBar from "../../components/NavBar/NavBar";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function SavedProperties() {
	const user = useSelector((state) => state.user);
	const navigate = useNavigate(); // Obtenemos la función de navegación

	useEffect(() => {
		if (!user) {
			// Si el usuario no está definido, redirige a la página de inicio de sesión
			navigate("/login");
		}
	}, [user, navigate]);

	const name = user?.name?.toUpperCase() || "";

	// Verificamos si user.savedProperties está definido antes de acceder a 'length'
	const savedPropertiesLength = user?.savedProperties?.length || 0;

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
					<div className="w-full justify-end">
						<button className="fixed right-2 flex flex-row justify-end text-white bg-transparent rounded-full mr-6">
							<Link to="/">
								<FontAwesomeIcon
									icon={faHouse}
									className="bg-cyan text-blue text-2xl py-2 px-2 rounded-full justify-center shadow-lg"
								/>
							</Link>
						</button>
					</div>
					{savedPropertiesLength === 0 ? (
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
