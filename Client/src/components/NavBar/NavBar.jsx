import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faBars,
  faGears,
  faHouseUser,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import fondo from "../../assets/img/fondo1.jpeg";
import logo from "../../assets/img/logo.png";
import { useSelector, useDispatch } from "react-redux";
import {
  filters,
  resetState,
  userLogOut,
  getProperty,
} from "../../redux/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [type, setType] = useState("");
  const [orderPrice, setOrderPrice] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(userLogOut());
    dispatch(resetState());
    dispatch(getProperty());
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
            href="/"
            className="font-onest font-black text-blue hover:text-white hover:no-underline mr-10"
          >
            ♥︎SAVED
          </a>
          <Link to="/create">
            <a className="font-onest font-black text-blue hover:text-white hover:no-underline pr-10">
              REGISTER YOUR PROPERTY
            </a>
          </Link>
          {user && user.role === "admin" && (
            <Link to="/loginadmin">
              <a className="font-onest font-black text-blue hover:text-white hover:underline mr-10 pr-10">
                DASHBOARD
              </a>
            </Link>
          )}

          {user && user.name ? (
            <>
              <button
                className="pt-2 pb-2 pr-10 pl-10 text-white bg-violet rounded-full mr-10 hover:bg-pink"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faBars} /> MENU
              </button>
              {isMenuOpen && (
                <div className="absolute top-10 right-[90px] mt-2 space-y-2 flex flex-col items-start bg-white p-5 rounded shadow">
                  <Link to="/gestionUser">
                    <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2">
                      <FontAwesomeIcon
                        icon={faGears}
                        style={{ color: "#050833" }}
                      />{" "}
                      My account
                    </a>
                  </Link>
                  <Link to="/postUser">
                    <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2">
                      <FontAwesomeIcon
                        icon={faHouseUser}
                        style={{ color: "#050833" }}
                      />{" "}
                      My properties
                    </a>
                  </Link>
                  <Link to="/postUser">
                    <a className="font-onest font-black text-blue hover:text-violet hover:no-underline text-left mb-2 ml-1">
                      <FontAwesomeIcon
                        icon={faCalendarCheck}
                        style={{ color: "#050833" }}
                      />{" "}
                      My bookings
                    </a>
                  </Link>
                </div>
              )}
              <button
                className="pt-1 pb-1 pr-2 pl-2 text-white bg-grey rounded-full mr-10 hover:bg-violet"
                onClick={handleLogout}
              >
                LogOut-
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </>
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
      {location.pathname === "/" && (
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
      )}
    </div>
  );
};

export default NavBar;
