import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const PropertyMap = ({ property }) => {
	const latitude = -34.61315;
	const longitude = -58.37723;

	return (
		<div className="w-full h-full overflow-hidden">
			<div className="mt-4 w-full h-full">
				<MapContainer
					center={[latitude, longitude]}
					zoom={12}
					style={{ width: "100%", height: "100%" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker position={[latitude, longitude]} />
				</MapContainer>
			</div>
		</div>
	);
};

export default PropertyMap;
