import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './components/Login/login';
import Home from './views/Home/Home';
import CreateProperty from './components/createProperty/createProperty';
import SignUpForm from './components/Singup/singUp';
import { useEffect } from 'react';
import { getProperty } from './redux/actions';
import Detail from '../src/views/Detail/Detail';
import NavBar from './components/NavBar/NavBar';
import NavBarAdmin from './components/NavBar/NavBarAdmin';
import HomeAdmin from './views/Home/HomeAdmin';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProperty());
	}, [dispatch]);

	return (
		<div className='bg-indigo-50'>
			{location.pathname === '/' && <NavBar />}
			{location.pathname === '/admin' && <NavBarAdmin />}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/create' element={<CreateProperty />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/signUp' element={<SignUpForm />} />
				<Route path='/admin' element={<HomeAdmin />} />
			</Routes>
		</div>
	);
}
export default App;
