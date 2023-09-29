import { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Cards from './components/Cards/Cards';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<NavBar />

				<Cards />
				<Footer />
			</div>
		</>
	);
}

export default App;
