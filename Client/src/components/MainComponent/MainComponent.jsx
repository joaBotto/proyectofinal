import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';

const MainComponent = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Axios: realiza la solicitud HTTP al servidor backend (actualmente comentado)
		// axios
		//   .get('/ruta_backend/properties')
		//   .then((response) => {
		//     setProperties(response.data);
		//     setLoading(false);
		//   })
		//   .catch((error) => {
		//     console.error('Error al obtener propiedades:', error);
		//     setLoading(false);
		//   });

		// Simulación de datos de ejemplo en lugar de la solicitud HTTP
		const exampleData = [
			{
				id: 1,
				title: 'Propiedad 1',
				price: 100000,
				address: 'Dirección 1',
				// Otros detalles de la propiedad
			},
			{
				id: 2,
				title: 'Propiedad 2',
				price: 150000,
				address: 'Dirección 2',
				// Otros detalles de la propiedad
			},
			// Agrega más datos de ejemplo según sea necesario
		];

		setProperties(exampleData); // Establece los datos de ejemplo
		setLoading(false); // Indica que la carga se ha completado
	}, []);

	return (
		<div>
			{loading ? (
				<p>Cargando propiedades...</p>
			) : (
				<>
					<SearchBar properties={properties} />
					<h2>Resultados de búsqueda:</h2>
					<ul>
						{properties.map((property) => (
							<li key={property.id}>
								<h3>{property.title}</h3>
								<p>Precio: ${property.price}</p>
								<p>Dirección: {property.address}</p>
								{/* Otros detalles de la propiedad */}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default MainComponent;
