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

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperty());
  }, [dispatch]);

  return (
    <div className="bg-gray-100">
      {location.pathname === "/" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateProperty />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signUp" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}
export default App;
