import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Importa el componente Link y useLocation de React Router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons"; // Importa los íconos de inicio de sesión y hamburguesa
/* import SearchBar from "../SearchBar/SearchBar"; */
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
/* import { useSelect } from "@mui/base"; */
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../redux/actions";
import CategoriaFilter from "../Filters/CategoriaFilter";
import FondoFilter from "../Filters/FondoFilter"
import PiletaFilter from "../Filters/PiletaFilter"
import PrecioFilter from "../Filters/PrecioFilter"
import ResenaFilter from "../Filters/ResenaFilter"
import UbicacionFilter from "../Filters/UbicacionFilter"

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user); //ME TRAIGO EL USER DEL ESTAGO GLOBAL. SI HAY USER(TRUE) USUARIO LOGUEADO, SI ESTA EN VACIO (FALSE) USUARIO DESLOGUEADO
	const [showHamburgerButton, setShowHamburgerButton] = useState(true); // cambiar cuando este login hecho
	const filteredData = useSelector((state) => state.filteredData);
	useEffect(() => {
		//
		setShowHamburgerButton(!showHamburgerButton); //SI NO HAY USER SETEA BOTN HAMB EN FALSE Y MUESTRA BOTON LOGIN. SI HAY USER SETEA BOTN HAMB Y MUESTRA BOTON LOGIN
	}, [user]);

	

	return (
		<div className="text-white mb-10">
			<div
				style={{ backgroundImage: `url(${fondo})` }}
				className="bg-cover bg-center min-h-[400px] flex items-center justify-between relative"
			>
				<div className="absolute top-0 left-0 mt-4 ml-4">
					<img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
				</div>
				<div className="absolute top-10 right-10 mt-4 space-x-4 flex items-center">
					<a
						href="/create"
						className="text-indigo-950 hover:text-indigo-50 hover:underline mr-10"
					>
						CREATE
					</a>
					{showHamburgerButton ? (
						<button className="pt-2 pb-2 pr-10 pl-10 text-white bg-fuchsia-900 rounded-full mr-10">
							<FontAwesomeIcon icon={faBars} /> MENU
						</button>
					) : (
						<Link
							to="/login"
							className="pt-2 pb-2 pr-10 pl-10 text-white bg-fuchsia-900 rounded-full"
						>
							<FontAwesomeIcon icon={faSignInAlt} /> LOGIN
						</Link>
					)}
				</div>
			</div>
			<div className="bg-white shadow py-2 w-1/3 rounded-full absolute top-[350px] left-[50%] transform translate-x-[-50%] -translate-y-[-50%]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-semibold text-indigo-950 flex items-center justify-center space-x-4">
            <CategoriaFilter />
            {/* Otros componentes de filtro */}
          </div>
        </div>
      </div>
      </div>
    
     
				
		 
      
      
      
				
		
	);
};

export default NavBar;
