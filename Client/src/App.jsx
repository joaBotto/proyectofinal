// App.js
import React from 'react';
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Cards from './components/Cards/Cards';

function App() {
	return (
		<div>
			<Navbar />
			<Cards />
			<Footer />
		</div>
	);
}

export default App;
