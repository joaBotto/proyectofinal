import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
//import { updateUser } from "../../redux/actions";

function SavedProperties() {
  const user = useSelector((state) => state.user);

  console.log("savedProperty:", user.savedProperties);

  return (
    <div>
      <h2>My Favorites</h2>
      {user.savedProperties.length === 0 ? (
        <p>No properties in your favorites.</p>
      ) : (
        <div className="p-4">
			<Cards properties={user.savedProperties} />
        </div>
      )}
    </div>
  );
}

export default SavedProperties;
