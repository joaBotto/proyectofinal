import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Home from './views/Home/Home';

function App() {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
