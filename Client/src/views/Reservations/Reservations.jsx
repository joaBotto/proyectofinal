import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBooking } from '../../redux/actions'; // Assuming getBooking is used for retrieving a single booking
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { FadeLoader } from 'react-spinners';

function Reservations() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const booking = useSelector((state) => state.bookingDetail);

	useEffect(() => {
		dispatch(getBooking(id));
	}, [dispatch, id]);

	return (
		<div className='bg-white w-screen h-screen overflow-x-hidden'>
			<NavBar />
			{booking && booking.property ? (
				<div className='p-11'>
					<h1 className='text-5xl font-onest font-extrabold uppercase text-cyan'>
						YOUR RESERVATION
					</h1>
					<p className='text-blue'>
						{booking.property.title} - {booking.property.address.city}
					</p>
					<p className='text-blue'>
						{booking.property.address.street} {booking.property.address.number}
					</p>
					<p className='text-blue'>
						{booking.property.address.state} {booking.property.address.country}
					</p>
					<p className='text-blue'>
						Check in: {booking.startDate} - Check out: {booking.endDate}
					</p>
					<p className='text-blue'>Total USD: {booking.totalAmount}</p>
					<p className='text-blue'>Status: {booking.status}</p>
				</div>
			) : (
				<div className='flex flex-col items-center w-full h-screen'>
					<FadeLoader color='#54086B' />
				</div>
			)}
		</div>
	);
}

export default Reservations;
