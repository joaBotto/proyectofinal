import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelector, useDispatch } from "react-redux";

const NavBarSimple = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [showHamburgerButton, setShowHamburgerButton] = useState(true);

	useEffect(() => {
		setShowHamburgerButton(!showHamburgerButton);
	}, [user]);

	return (
		<div className="text-white mb-10">
			<div className="pb-20 flex items-center justify-between relative">
				<div className="absolute top-0 left-0 mt-4 ml-4">
					<Link to="/">
						<img className="w-60 pt-4 pl-8" src={logo} alt="Your Company" />
					</Link>
				</div>
				<div className="absolute top-10 right-10 mt-4 space-x-4 flex items-center">
					<a
						href="/"
						className="font-onest font-black text-blue hover:text-cyan hover:underline mr-10"
					>
						♥︎SAVED
					</a>
					<a
						href="/create"
						className="font-onest font-black text-blue hover:text-cyan hover:underline mr-10 pr-10"
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
		</div>
	);
};

export default NavBarSimple;
