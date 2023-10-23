import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import fondo from "../../../assets/img/fondo1.jpeg";
import logo from "../../../assets/img/logo.png";



const NavBarAdmin = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white mb-10">
      <div
        style={{ backgroundImage: `url(${fondo})` }}
        className="bg-cover bg-center sm:min-h-[400px] min-h-[200px] flex items-center justify-between relative"
      >
        <h1 className="absolute sm:text-5xl text-xl font-black text-violet mt-10 top-40 left-7 leading-[1.2] font-onest">
          ADMINISTRATOR VIEW
        </h1>

        {/* LOGO */}
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <Link to="/">
            <img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
          </Link>
        </div>

        {/* MENU DESPLEGABLE */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="absolute top-40 left-0 font-onest font-black bg-violet text-red hover:text-white hover:underline"
          >
            {menuOpen ? "Cerrar Menú" : "Abrir Menú"}
          </button>
          <aside
        className={`absolute top-0 left-0 bg-gray-200 shadow-lg w-64 h-screen overflow-y-auto ${
          menuOpen ? "block" : "hidden"
        }`}
      >
            {menuOpen && (
              <ul className="text-black">
                <Link to="/admin/properties">
                  <li value="posts">Posts</li>
                </Link>
                <Link to="/admin/users">
                  <li value="users">Users</li>
                </Link>
                <li value="bookings">Booking</li>
              </ul>
            )}
          </aside>
        </div>

        {/* BOTON BACK TO HOME */}
        <div className="hidden sm:flex sm:items-center sm:space-x-4 absolute top-10 right-10 mt-4">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="font-onest font-black bg-violet text-red hover:text-white hover:underline"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
