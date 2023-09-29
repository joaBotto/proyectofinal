import React, { useState } from 'react';

const exampleData = [
	{
		id: 1,
		name: 'Ejemplo 1',
		description: 'Descripción de Ejemplo 1',
		price: 100,
		location: 'Ejemplo Location 1',
	},
	{
		id: 2,
		name: 'Ejemplo 2',
		description: 'Descripción de Ejemplo 2',
		price: 200,
		location: 'Ejemplo Location 2',
	},
	// Agrega más datos de ejemplo según sea necesario
];

const SearchBar = () => {
	// Estado para el término de búsqueda
	const [searchTerm, setSearchTerm] = useState('');
	// Estado para la página actual
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// Función para buscar productos por nombre, precio o ubicación
	// Comentamos esta función para evitar errores por ahora
	// const searchProducts = () => {
	//   // En lugar de utilizar 'products', usarías tus datos reales cuando estén disponibles
	//   // return products.filter(
	//   //   (product) =>
	//   //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	//   //     product.price.toString().includes(searchTerm) ||
	//   //     product.location.toLowerCase().includes(searchTerm.toLowerCase())
	//   // );
	// };

	// Función para cambiar de página
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Filtrar productos y paginar
	// Comentamos estas líneas para evitar errores por ahora
	// const filteredProducts = searchProducts();
	// const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
	// const paginatedProducts = filteredProducts.slice(
	//   (currentPage - 1) * itemsPerPage,
	//   currentPage * itemsPerPage
	// );

	return (
		<div className='p-4'>
			<input
				type='text'
				className='border p-2 w-full mb-4'
				placeholder='Buscar inmuebles...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{/* Mantenemos este bloque comentado para evitar errores */}
			{/* {paginatedProducts.length === 0 ? (
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
			)} */}
			{/* Mantenemos este bloque comentado para evitar errores */}
			{/* {pageCount > 1 && (
				<div className='mt-4'>
					<span className='mr-2'>
						Página {currentPage} de {pageCount}
					</span>
					{Array.from({ length: pageCount }).map((_, index) => (
						<button
							key={index}
							onClick={() => handlePageChange(index + 1)}
							className={`btn btn-sm btn-primary mr-2 ${
								currentPage === index + 1 ? 'active' : ''
							}`}
						>
							{index + 1}
						</button>
					))}
				</div>
			)} */}
		</div>
	);
};

export default SearchBar;
