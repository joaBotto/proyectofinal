import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./components/login/login";
import Home from "./views/Home/Home";
import  CreateProperty  from './components/createProperty/createProperty'
//import SignUpForm from "./components/Singup/singUp";
import { useEffect } from "react";
import { getProperty } from "./redux/actions";
import  Detail  from "../src/views/Detail/Detail"


function App() {

const dispatch = useDispatch()
	
useEffect(()=>{
		dispatch(getProperty())	
		},[dispatch])

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />

				<Route path="/create" element={<CreateProperty />} />

				<Route path="/detail/:id" element={<Detail />} />

				{/* <Route path="/signUp" element={<SignUpForm />} /> */}

				<Route path="/" element={<Home />} />
        
			</Routes>
		</>
	);
}

export default App;
