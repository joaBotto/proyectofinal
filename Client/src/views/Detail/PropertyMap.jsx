
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PropertyMap = ({ property }) => {
	const [coordinates, setCoordinates] = useState([51.505, -0.09]);

	useEffect(() => {
		if (property.address && property.address.zipcode) {
			const zipCode = property.address.zipcode;

			fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${zipCode}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.length > 0) {
						const location = data[0];
						setCoordinates([location.lat, location.lon]);
					}
				})
				.catch((error) => {
					console.error("Error fetching coordinates:", error);
				});
		}
	}, [property.address]);

	return (
		<MapContainer center={coordinates} zoom={13} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={coordinates}>
				<Popup>
					Property Location
					<br />
					Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default PropertyMap;
