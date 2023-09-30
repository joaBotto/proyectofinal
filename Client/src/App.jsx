import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Home from "./views/Home/Home";
import AccountEdit from "./components/accountEdit/visualAccount";
import PersonalDate from "./components/accountEdit/editPersonalDate";
import Security from "./components/accountEdit/editSecurity";
import Payment from "./components/accountEdit/editPayment";
//import EmailNotification from "./components/account/emailNotification"
/////////////////
import Property from "./components/propertyAdmin/listProperty"


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
		<Route path="/property" element={<Property/>} />
        <Route path="/accountEdit" element={<AccountEdit/>} />
		<Route path="/dashboard/edit_personal_date" element={<PersonalDate/>}/>
		<Route path="/dashboard/edit_security" element={<Security/>} />
		<Route path="/dashboard/edit_payment" element={<Payment/>} />

      </Routes>
    </>
  );
}

export default App;

//<Route path="/email_notification" element={<EmailNotification/>} /> 