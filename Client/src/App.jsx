import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./views/Home/Home";
import  CreateProperty  from './components/createProperty/createProperty'


function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/create" element={<CreateProperty />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
