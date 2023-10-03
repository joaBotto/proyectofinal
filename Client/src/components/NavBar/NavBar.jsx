import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Importa el componente Link y useLocation de React Router
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faBars } from "@fortawesome/free-solid-svg-icons"; // Importa los íconos de inicio de sesión y hamburguesa

import SearchBar from "../SearchBar/SearchBar";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((state) => state.user);//ME TRAIGO EL USER DEL ESTAGO GLOBAL. SI HAY USER(TRUE) USUARIO LOGUEADO, SI ESTA EN VACIO (FALSE) USUARIO DESLOGUEADO
  const [showHamburgerButton, setShowHamburgerButton] = useState(true);// cambiar cuando este login hecho

  useEffect(() => {// 
    setShowHamburgerButton(!showHamburgerButton);//SI NO HAY USER SETEA BOTN HAMB EN FALSE Y MUESTRA BOTON LOGIN. SI HAY USER SETEA BOTN HAMB Y MUESTRA BOTON LOGIN
  }, [user]);

  return (
    <div className="bg-gray-800 text-white">
      {/* Hero con imagen de fondo */}
      <div
        style={{ backgroundImage: `url(${fondo})` }}
        className="bg-cover bg-center min-h-[200px] flex items-center relative"
      >
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <img className="h-12 w-12" src={logo} alt="Your Company" />
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4 space-x-4">
          <a href="/create" className="text-white">
            CREATE
          </a>
          {/* <a href='/' className='text-white'>
						HOME
					</a>
					<a href='#' className='text-white'>
						ABOUT
					</a>
					<a href='#' className='text-white'>
						SAVED
					</a> */}
          {showHamburgerButton ? (
            <button className="text-white">
              <FontAwesomeIcon icon={faBars} /> MENU
            </button>
          ) : (
            <Link to="/login" className="text-white">
              <FontAwesomeIcon icon={faSignInAlt} /> LOGIN
            </Link>
          )}
        </div>
        <h4 className="text-2xl font-semibold text-purple-600 mt-8 ml-4">
          FIND A HOME THAT
          <br /> SUITS YOU
        </h4>
      </div>

      {/* Resto de tu código */}
      <header className="bg-white shadow py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
			<input></input>
          </h1>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
