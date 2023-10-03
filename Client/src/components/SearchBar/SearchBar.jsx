import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducto } from '../../redux/actions';

const SearchBar = () => {
	const dispatch = useDispatch();
	const searchTermRedux = useSelector((state) => state.searchTerm);

	const [searchTerm, setSearchTerm] = useState(searchTermRedux || ''); // Inicializar con un valor predeterminado si searchTermRedux es undefined

	// Estado local para el término de búsqueda y los resultados

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// Función para buscar productos por nombre, precio o ubicación
	const inmuebles = useSelector((state) => state.properties);

	const searchProducts = () => {
		return inmuebles.filter(
			(inmueble) =>
				inmueble.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				inmueble.precio.toString().includes(searchTerm) ||
				inmueble.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	// Función para cambiar el término de búsqueda en el estado de Redux
	const handleSearchTermChange = (e) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		dispatch(searchProducto(newSearchTerm));
	};

	// Función para cambiar de página
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	// Filtrar productos y paginar
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
				onChange={handleSearchTermChange}
			/>
			<button onClick={searchProducts}>Buscar</button>

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
							className={`btn btn-sm btn-primary mr-2 ${
								currentPage === index + 1 ? 'active' : ''
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

export default SearchBar;
