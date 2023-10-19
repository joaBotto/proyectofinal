import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate en lugar de useHistory
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { filters } from "../../redux/actions";
import DropdownMenu from "../utils/DropdownMenu";

const NavBarAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // FILTROS
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

  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white mb-10">
      <div
        style={{ backgroundImage: `url(${fondo})` }}
        className="bg-cover bg-center sm:min-h-[400px] min-h-[200px] flex items-center justify-between relative"
      >
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
          <aside className="absolute top-40 left-0 bg-gray-200 shadow-lg">
            {menuOpen && (
              <ul className="text-black">
                <li value="posts">Posts</li>
                <li value="users">Users</li>
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

      {/* FILTROS */}

      <div className="bg-white shadow py-2 w-1/3 rounded-full absolute top-[350px] left-[50%] transform translate-x-[-50%] -translate-y-[-50%]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xl font-semibold text-blue flex items-center justify-center space-x-4">
            <select
              onChange={handleChange}
              name="type"
              className="px-3 py-1 w-full rounded-full"
            >
              <option value="default">Search by type</option>
              <option value="Appartment">Appartment</option>
              <option value="House">House</option>
              <option value="Horizontal Property">Horizontal Property</option>
            </select>
            <select
              onChange={handleChange}
              name="price"
              className="px-3 py-1 w-full rounded-full"
            >
              <option value="default">Search by price</option>
              <option value="-">Lowest to highest</option>
              <option value="+">Highest to lowest</option>
            </select>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
