import Card from "../Card/Card";
import FadeLoader from "react-spinners/FadeLoader";

export default function Cards({ properties, searchQuery }) {
	const propertiesToShow = searchQuery
		? properties.filter((property) =>
				property.title.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: properties;
	return (
		<div className="p-4">
			<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
				{propertiesToShow.length > 0 ? (
					propertiesToShow.map(
						(property) =>
							property.active === true && (
								<Card
									key={property._id}
									_id={property._id}
									title={property.title}
									description={property.description}
									price={property.price}
									images={property.images || "Sin img"}
									location={property.address.city}
									bedrooms={property.bedrooms}
									bathrooms={property.bathrooms}
									area={property.amenities?.covered_area || "50"}
								/>
							)
					)
				) : (
					<div className="flex justify-center items-center h-screen">
						<FadeLoader color="#54086B" />
					</div>
				)}
			</div>
		</div>
	);
}
