import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { updateUser } from "../../redux/actions";

function SavedProperties() {
  const savedProperty = useSelector((state) => state.savedProperties);

  console.log("savedProperty:", savedProperty);

  return (
    <div>
      <h2>My Favorites</h2>
      {savedProperty.length === 0 ? (
        <p>No properties in your favorites.</p>
      ) : (
        <div className="p-4">
			<Cards properties={savedProperty} />
        </div>
      )}
    </div>
  );
}

export default SavedProperties;
