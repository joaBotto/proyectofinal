import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
//import Home from "./views/Home/Home";
import Dashboard from "./components/dashboard/visualDashboard"
import PersonalDate from "./components/dashboard/editPersonalDate"
import Security from "./components/dashboard/editSecurity"
import Payment from "./components/dashboard/editPayment"
//import Property from "./components/dashboard/editProperty"
//import EmailNotification from "./components/dashboard/emailNotification"


function App() {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
			{/* 	<Route path="/" element={<Home />} /> */}
				<Route path="/" element={<Dashboard/>} />
				<Route path="edit_personal_date" element={<PersonalDate/>} />
				<Route path="edit_security" element={<Security/>} />
				<Route path="edit_payment" element={<Payment/>} />
		{/* 		<Route path="/edit_property" element={<Property/>} />
				<Route path="/email_notification" element={<EmailNotification/>} /> */}
			</Routes>
		</>
	);
}

export default App;
