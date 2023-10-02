import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./views/Home/Home";
<<<<<<< HEAD
import  CreateProperty  from './components/createProperty/createProperty'

=======
>>>>>>> 8cb5018 (added logo)

function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
<<<<<<< HEAD
				<Route path="/create" element={<CreateProperty />} />
=======
>>>>>>> 8cb5018 (added logo)
				<Route path="/" element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
