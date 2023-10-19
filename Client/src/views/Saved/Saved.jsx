import { useSelector } from "react-redux";

function SavedProperties() {
	const savedProperties = useSelector((state) => state.savedProperties);
	console.log(savedProperties);

	return (
		<div>
			<h2>Saved Properties</h2>
		</div>
	);
}

export default SavedProperties;
