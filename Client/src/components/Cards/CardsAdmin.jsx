import CardAdmin from '../admin/CardAdmin/CardAdmin';

export default function CardsAdmin({ properties }) {

	return (
		<div className='p-4'>
			<div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
				{properties.length > 0 ? (
					properties.map((property) => (
						<CardAdmin
							key={property._id}
							_id={property._id}
							title={property.title}
							description={property.description}
							price={property.price}
							images={property.images || 'Sin img'}
							location={property.address.city}
							bedrooms={property.bedrooms}
							bathrooms={property.bathrooms}
							area={property.amenities?.covered_area || "50"}
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
