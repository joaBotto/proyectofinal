import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLocationDot,
	faBed,
	faBath,
	faRulerCombined,
	faEdit,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from './ImageCarousel';
import { useDispatch } from 'react-redux'; // Importa useDispatch
import { deletePost } from '../../redux/actionAdmin';
import CreatePropertyAdmin from '../createProperty/createPropertyAdmin';
import './CardAdmin.css';

const CardAdmin = ({
	_id,
	title,
	description,
	price,
	images,
	location,
	bedrooms,
	bathrooms,
}) => {
	const dispatch = useDispatch(); // Mueve el useDispatch aquí dentro del componente

	// Función para manejar la eliminación de una tarjeta
	const handleDeleteCard = (cardId) => {
		dispatch(deletePost(cardId));
	};

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='flex-auto rounded-xl py-2'>
			<div className='px-4 pt-5 sm:px-6'>
				<div className='relative rounded-xl shadow overflow-hidden'>
					<ImageCarousel images={images} />
				</div>
				<Link to={`/detail/${_id}`}>
					<h3 className='pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase'>
						{title?.slice(0, 20)}
					</h3>
				</Link>
			</div>
			<div className='mx-6 grid grid-rows-3 gap-y-2 font-onest'>
				<p className='text-sm mt-1 pb-0 mb-0 font-medium text-blue'>
					<FontAwesomeIcon icon={faLocationDot} /> {location}
				</p>
				<p className='text-3xl text-right mb-2 font-bold text-blue'>
					U$D {price}
				</p>
				<div className='grid grid-cols-3 gap-3 place-items-stretch'>
					<div className='flex justify-center items-center rounded-md bg-cyan'>
						<p className='text-sm font-medium text-blue text-center'>
							{bedrooms} <FontAwesomeIcon icon={faBed} />
						</p>
					</div>
					<div className='flex justify-center items-center rounded-md bg-cyan'>
						<p className='text-sm font-medium text-blue text-center'>
							{bathrooms} <FontAwesomeIcon icon={faBath} />
						</p>
					</div>
					<div className='flex justify-center items-center rounded-md bg-cyan'>
						<p className='text-sm font-medium text-blue text-center'>
							<FontAwesomeIcon icon={faRulerCombined} /> x m²
						</p>
					</div>
				</div>
			</div>
			<p className='mx-6 text-sm pb-0 mt-3 text-justify font-noto font-medium text-blue'>
				{description?.slice(0, 100)}...
			</p>
			<div className='flex justify-between items-center'>
				<button
					onClick={openModal} // Llamar a la función de edición con el ID como argumento
					className='bg-blue text-white font-onest font-light px-4 py-2 rounded-full mx-4 my-4 self-end hover:bg-pink'
				>
					<FontAwesomeIcon icon={faEdit} /> Edit
				</button>
				<button
					onClick={() => handleDeleteCard(_id)} // Llamar a la función de eliminación con el ID como argumento
					className='bg-blue text-white font-onest font-light px-4 py-2 rounded-full mx-4 my-4 self-end hover:bg-pink'
				>
					<FontAwesomeIcon icon={faTrash} /> delete
				</button>
			</div>

			{isModalOpen && ( // Renderiza el modal si isModalOpen es true
				<div className='modal'>
					<div className='modal-content'>
						<button onClick={closeModal}>Cerrar Modal</button>
						<CreatePropertyAdmin />
					</div>
				</div>
			)}
		</div>
	);
};

export default CardAdmin;
