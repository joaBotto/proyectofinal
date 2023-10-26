import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSignInAlt,
	faSignOutAlt,
	faBars,
	faHome,
	faGears,
	faHouseUser,
	faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { EditFilled, UserOutlined } from "@ant-design/icons";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { resetState, userLogOut, getProperty } from "../../redux/actions";
import { Avatar } from "antd";

const NavBar = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const user = useSelector((state) => state.user);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogout = () => {
		dispatch(userLogOut());
		dispatch(resetState());
		dispatch(getProperty());
	};

	return (
		<div className="text-white">
			<div
				style={{ backgroundImage: `url(${fondo})` }}
				className="bg-cover bg-center sm:min-h-[400px] min-h-[200px] flex items-center justify-between relative"
			>
				<div className="absolute top-0 left-0 mt-4 ml-4">
					<Link to="/">
						<img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
					</Link>
				</div>
				<div className="absolute top-10 right-10 mt-4 space-x-20 flex items-center">
					<Link to="/" className="">
						<a
							className={`font-onest font-black text-blue hover:text-white hover:no-underline transition ease-in duration-150 ${
								location.pathname === "/" ? "text-white hover:text-white" : ""
							}`}
						>
							HOME
						</a>
					</Link>
					<Link to="/saved" className="">
						<a
							className={`font-onest font-black text-blue hover:text-white hover:no-underline transition ease-in duration-150 ${
								location.pathname === "/saved"
									? "text-white hover:text-white"
									: ""
							}`}
						>
							♥︎SAVED
						</a>
					</Link>
					<Link to="/create" className="">
						<a
							className={`font-onest font-black text-blue hover:text-white hover:no-underline transition ease-in duration-150 ${
								location.pathname === "/create"
									? "text-white hover:text-white"
									: ""
							}`}
						>
							REGISTER YOUR PROPERTY
						</a>
					</Link>
					{user && user.name ? (
						<>
							<button
								className={`py-2 px-2 text-white font-onest rounded-full mr-10 ${
									isMenuOpen
										? "bg-cyan ring-2 ring-blue border-b-2 border-blue shadow-lg transition ease-in duration-150"
										: "bg-cyan hover:bg-cyan hover:ring-2 hover:ring-blue shadow-lg transition ease-in duration-150"
								}`}
								onClick={toggleMenu}
							>
								{user.images?.image ? (
									<Avatar
										size={{
											xs: 24,
											sm: 24,
											md: 24,
											lg: 24,
											xl: 40,
											xxl: 30,
										}}
										src={user.images?.image}
									/>
								) : (
									<Avatar
										size={{
											xs: 24,
											sm: 24,
											md: 24,
											lg: 24,
											xl: 40,
											xxl: 30,
										}}
										icon={<UserOutlined />}
									/>
								)}
								<FontAwesomeIcon icon={faBars} className="px-5" />
							</button>
							{isMenuOpen && (
								<div className="absolute right-0 top-16 space-y-2 flex flex-col items-end ring-2 ring-blue border-b-2 border-blue bg-white p-5 rounded-xl shadow-xl">
									<Link to="/gestionUser">
										<a className="font-onest font-normal text-blue hover:text-cyan hover:no-underline text-left mb-2">
											Account
											<FontAwesomeIcon icon={faGears} className="ml-2" />
										</a>
									</Link>
									<Link to="/postUser">
										<a className="font-onest font-normal text-blue hover:text-cyan hover:no-underline text-left mb-2 transition ease-in duration-150">
											Registered Properties
											<FontAwesomeIcon icon={faHouseUser} className="ml-2" />
										</a>
									</Link>
									<Link to="/bookings">
										<a className="font-onest font-normal text-blue hover:text-cyan hover:no-underline text-left mb-2 ml-1 transition ease-in duration-100">
											My bookings{" "}
											<FontAwesomeIcon
												icon={faCalendarCheck}
												className="ml-2"
											/>
										</a>
									</Link>
									<div>
										<p className="pb-4"></p>
									</div>
									{user && user.role === "admin" && (
										<Link to="/admin">
											<a className="font-onest font-black text-blue hover:text-cyan hover:no-underline text-left mb-2">
												Admin View <EditFilled className="ml-2" />
											</a>
										</Link>
									)}
									<button
										className="font-onest font-black text-blue bg-grey rounded-full hover:text-cyan transition ease-in duration-100"
										onClick={handleLogout}
									>
										LOGOUT
										<FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
									</button>
								</div>
							)}
						</>
					) : (
						<Link
							to="/login"
							className="pt-2 pb-2 pr-10 pl-10 text-white bg-violet hover:bg-pink rounded-full transition ease-in duration-100"
						>
							<FontAwesomeIcon icon={faSignInAlt} /> LOGIN
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
