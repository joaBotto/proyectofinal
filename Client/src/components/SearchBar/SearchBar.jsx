import React, { useState, useEffect } from 'react';

// Supongamos que tienes una base de datos de productos en formato JSON
const database = [
	{
		id: 1,
		name: 'casa quinta',
		description: 'Descripción del Producto 1',
		price: 10,
		location: 'tachira',
	},
	{
		id: 2,
		name: 'departamento duplex',
		description: 'Descripción del Producto 2',
		price: 20,
		location: 'buenos aires',
	},
	// Agrega más productos aquí...
];

const itemsPerPage = 5; // Cantidad de productos por página

const Searchbar = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [products, setProducts] = useState([]); // Estado para almacenar los productos

	useEffect(() => {
		// Simulamos una solicitud a la base de datos, por ejemplo, usando fetch o Axios
		// En este ejemplo, simplemente establecemos los productos de la base de datos ficticia en el estado.
		setProducts(database);
	}, []);

	// Función para realizar la búsqueda de productos por nombre, precio o ubicación
	const searchProducts = () => {
		return products.filter(
			(product) =>
				product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				product.price.toString().includes(searchTerm) ||
				product.location.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	// Función para cambiar de página
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const filteredProducts = searchProducts();
	const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<div className='p-4'>
			<input
				type='text'
				className='border p-2 w-full mb-4'
				placeholder='Buscar inmuebles...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{paginatedProducts.length === 0 ? (
				<p>No se encontraron resultados.</p>
			) : (
				<ul>
					{paginatedProducts.map((product) => (
						<li key={product.id} className='mb-2'>
							<strong>{product.name}</strong>: {product.description}, Precio: $
							{product.price}, Ubicación: {product.location}
						</li>
					))}
				</ul>
			)}
			{pageCount > 1 && (
				<div className='mt-4'>
					<span className='mr-2'>
						Página {currentPage} de {pageCount}
					</span>
					{Array.from({ length: pageCount }).map((_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`px-2 py-1 border ${
								currentPage === index + 1 ? 'bg-gray-500 text-white' : ''
							}`}
						>
							{index + 1}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Searchbar;
