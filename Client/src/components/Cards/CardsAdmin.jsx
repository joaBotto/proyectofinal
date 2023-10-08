import CardAdmin from '../Card/CardAdmin';

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
							id="map" style="height: 400px; width: 100%;"
							location={property.address.city}
							bedrooms={property.bedrooms}
							bathrooms={property.bathrooms}
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
