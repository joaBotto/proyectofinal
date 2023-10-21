import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./views/Home/Home";
import CreateProperty from "./components/createProperty/createProperty";
import SignUpForm from "./components/Singup/singUp";
import Detail from "../src/views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import NavBarAdmin from "./components/admin/NavBar/NavBarAdmin";
import HomeAdmin from "../src/components/admin/Posts/Posts";
import Error404 from "./components/Error/Error404";
import { EditPropertyFromAdmin } from "./components/admin/editProperty/editProperty";
import Reservations from "./views/Reservations/Reservations";
import GestionUser from "./views/gestionUser/GestionUser";
import Postuser from "./components/propertiesAdmin/propertyUser";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import { AllUsers } from "./components/admin/allUsers/allUsers";
import EditAccount from "./components/propertiesAdmin/personalEdit";
import EditPaymentInfo from "./components/propertiesAdmin/paymentEdit"
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://inmobiliaria360.up.railway.app";

function App() {
	const location = useLocation();


  return (
    <div className="bg-indigo-50">
      {location.pathname === "/" && <NavBar />}  
      {location.pathname === "/postUser" && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/detail/:id/reservations" element={<Reservations />} />
        <Route path="/postUser" element={<Postuser />} />
        <Route path="/checkout" element={<PaymentForm />} />
        <Route path="/gestionUser" element={<GestionUser />} />
        <Route path="/personalEdit" element={<EditAccount />} />
        <Route path="/admin" element={<NavBarAdmin />} />
        <Route path="/admin/properties" element={<HomeAdmin />} />
        <Route path="/admin/property/:id" element={<EditPropertyFromAdmin />} />
        <Route path="/admin/users" element={<AllUsers />} />
		<Route path="/paymentEdit" element={<EditPaymentInfo />} />
      </Routes>
    </div>
  );
}
export default App;



/* import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./components/Login/login";
import Home from "./views/Home/Home";
import CreateProperty from "./components/createProperty/createProperty";
import SignUpForm from "./components/Singup/singUp";
import Detail from "../src/views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import NavBarAdmin from "./components/NavBar/NavBarAdmin";
import HomeAdmin from "./views/Home/HomeAdmin";
import Error404 from "./components/Error/Error404";
import LoginAdmin from "./components/Login/LoginAdmin";
import { EditPropertyFromAdmin } from "./components/admin/editProperty/editProperty";
import Reservations from "./views/Reservations/Reservations";
import GestionUser from "./views/gestionUser/GestionUser";
import Postuser from "./components/propertiesAdmin/propertyUser";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import { AllUsers } from "./components/admin/allUsers/allUsers";
import EditAccount from "./components/propertiesAdmin/personalEdit";
import EditPaymentInfo from "./components/propertiesAdmin/paymentEdit"
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://inmobiliaria360.up.railway.app";

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	return (
		<div className="bg-indigo-50">
			{location.pathname === "/" && <NavBar />}
			{location.pathname === "/admin" && <NavBarAdmin />}
			{location.pathname === "/postUser" && <NavBarAdmin />}

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/create" element={<CreateProperty />} />
				<Route path="/detail/:id" element={<Detail />} />
				<Route path="/signUp" element={<SignUpForm />} />
				<Route path="/admin" element={<HomeAdmin />} />
				<Route path="/error404" element={<Error404 />} />
				<Route path="/loginadmin" element={<LoginAdmin />} />
				<Route path="/admin/property/:id" element={<EditPropertyFromAdmin />} />
				<Route path="/admin/users" element={<AllUsers />} />
				<Route path="/detail/reservations/:id" element={<Reservations />} />
				<Route path="/postUser" element={<Postuser />} />
				<Route path="/checkout" element={<PaymentForm />} />
				<Route path="/gestionUser" element={<GestionUser />} />
				<Route path="/personalEdit" element={<EditAccount />} />
				<Route path="/paymentEdit" element={<EditPaymentInfo />} />
			</Routes>
		</div>
	);
}
export default App; */