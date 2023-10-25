import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome } from "@fortawesome/free-solid-svg-icons";
import fondo from "../../../assets/img/fondo1.jpeg";
import logo from "../../../assets/img/logo.png";

const NavBarAdmin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="text-white ">
      <div
        style={{ backgroundImage: `url(${fondo})` }}
        className="bg-cover bg-center sm:min-h-[400px] min-h-[200px] flex items-center justify-between relative "
      >
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <Link to="/">
            <img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
          </Link>
        </div>

        <div className="absolute top-10 right-10 mt-4">
    
          <button
            onClick={toggleMenu}
            className="pt-2 pb-2 pr-10 pl-10 text-white bg-violet rounded-full mr-6 hover:bg-pink transition ease-in duration-150"
          >
            <FontAwesomeIcon icon={faBars} /> MENU
          </button>
          {isMenuOpen && (
           <div className="absolute top-10 right-[108px] mt-2 space-y-2 flex flex-col items-start bg-white p-5 rounded shadow">
              <Link to="/admin/properties">
                <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2">
                  Posts
                </a>
              </Link>
              <Link to="/admin/users">
                <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2 transition ease-in duration-150">
                  Users
                </a>
              </Link>
              <Link to="/postUser">
                <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2 ml-1 transition ease-in duration-100">
                  My bookings
                </a>
              </Link>
            </div>
          )}
              <Link to="/">
            <button className="pt-2 pb-2 pr-5 pl-5 text-white bg-grey rounded-full mr-10 hover:bg-violet transition ease-in duration-100">
              <FontAwesomeIcon icon={faHome} /> HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
