import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../redux/actions";

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [showHamburgerButton, setShowHamburgerButton] = useState(true);

	useEffect(() => {
		setShowHamburgerButton(!showHamburgerButton);
	}, [user]);

	const [type, setType] = useState("");
	const [orderPrice, setOrderPrice] = useState("");

	const handleChange = (event) => {
		const name = event.target.name;
		if (name === "type") {
			setType(event.target.value);
			dispatch(filters(event.target.value, orderPrice));
		}
		if (name === "price") {
			setOrderPrice(event.target.value);
			dispatch(filters(type, event.target.value));
		}
	};

	return (
		<div className="text-white mb-10">
			<div
				style={{ backgroundImage: `url(${fondo})` }}
				className="bg-cover bg-center sm:min-h-[400px] min-h-[200px] flex items-center justify-between relative"
			>
				<div className="absolute top-0 left-0 mt-4 ml-4">
					<Link to="/">
						<img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
					</Link>
				</div>
				<div className="absolute top-10 right-10 mt-4 space-x-4 flex items-center">
					<a
						href="/create"
						className="font-onest font-black text-blue hover:text-white hover:underline mr-10"
					>
						REGISTER YOUR PROPERTY
					</a>
					{showHamburgerButton ? (
						<button className="pt-2 pb-2 pr-10 pl-10 text-white bg-violet rounded-full mr-10">
							<FontAwesomeIcon icon={faBars} /> MENU
						</button>
					) : (
						<Link
							to="/login"
							className="pt-2 pb-2 pr-10 pl-10 text-white bg-violet rounded-full"
						>
							<FontAwesomeIcon icon={faSignInAlt} /> LOGIN
						</Link>
					)}
				</div>
			</div>
			<div className="bg-white shadow py-2 w-1/3 rounded-full absolute top-[350px] left-[50%] transform translate-x-[-50%] -translate-y-[-50%]">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<p className="text-xl font-semibold text-blue flex items-center justify-center space-x-4">
						<select
							onChange={handleChange}
							name="type"
							className="px-3 py-1 rounded-full"
						>
							<option value="default">Filter by type</option>
							<option value="depto">Apartment</option>
							<option value="house">House</option>
							<option value="ph">PH</option>
						</select>
						<select
							onChange={handleChange}
							name="price"
							className="px-3 py-1 rounded-full"
						>
							<option value="default">Sort by price</option>
							<option value="-">Lowest to highest</option>
							<option value="+">Highest to lowest</option>
						</select>
					</p>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
