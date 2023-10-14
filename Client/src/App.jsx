import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./components/Login/login";
import Home from "./views/Home/Home";
import CreateProperty from "./components/createProperty/createProperty";
import SignUpForm from "./components/Singup/singUp";
import { useEffect } from "react";
import { getProperty } from "./redux/actions";
import Detail from "../src/views/Detail/Detail";
import NavBar from "./components/NavBar/NavBar";
import NavBarAdmin from "./components/admin/NavBar/NavBarAdmin";
import HomeAdmin from "../src/components/admin/Posts/Posts";
import Error404 from "./components/Error/Error404";
import LoginAdmin from "./components/Login/LoginAdmin";
import { EditPropertyFromAdmin } from "./components/admin/editProperty/editProperty";
import BookingSystem from "./views/Reservations/Reservations";
import Postuser from "./components/propertiesAdmin/propertyUser";
import PaymentForm from "./components/PaymentForm/PaymentForm";
import GestionUser from "./views/gestionUser/GestionUser";
import { AllUsers } from "./components/admin/allUsers/allUsers";
import EditAccount from "./components/propertiesAdmin/personalEdit";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperty());
  }, [dispatch]);

  return (
    <div className="bg-indigo-50">
      {location.pathname === "/" && <NavBar />}  
      {location.pathname === "/postUser" && <NavBarAdmin />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/error404" element={<Error404 />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/detail/:id/reservations" element={<BookingSystem />} />
        <Route path="/postUser" element={<Postuser />} />
        <Route path="/checkout" element={<PaymentForm />} />
        <Route path="/gestionUser" element={<GestionUser />} />
        <Route path="/personalEdit" element={<EditAccount />} />
        <Route path="/admin" element={<NavBarAdmin />} />
        <Route path="/admin/properties" element={<HomeAdmin />} />
        <Route path="/admin/property/:id" element={<EditPropertyFromAdmin />} />
        <Route path="/admin/users" element={<AllUsers />} />
      </Routes>
    </div>
  );
}
export default App;
