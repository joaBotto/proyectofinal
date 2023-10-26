const MyBookingCard = ({ booking, key }) => {
	return (
		<div key={key} className="m-4 p-4 border border-gray-300 rounded-lg">
			<h2 className="text-xl font-semibold">Booking {booking._id}</h2>
			<p>Start Date: {booking.startDate}</p>
			<p>End Date: {booking.endDate}</p>
			{/* Display other booking information here */}
			{booking.property && (
				<div>
					<h3>Property Information:</h3>
					<p>Property Title: {booking.property.title}</p>
					<p>Property Type: {booking.property.type}</p>
					{/* Display other property information here */}
				</div>
			)}
		</div>
	);
};

export default MyBookingCard;
