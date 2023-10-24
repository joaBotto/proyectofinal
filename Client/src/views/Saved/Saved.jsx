import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { Link } from "react-router-dom";
//import { updateUser } from "../../redux/actions";

function SavedProperties() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h2 className="inline sm:text-5xl text-xl font-black text-violet mx-10 left-7 leading-[1.2] font-onest">
        My Favorites
      </h2>
      <Link to={"/"}>
        <button className="bg-blue text-white font-onest font-light px-4 py-2 ml-0 rounded-full mx-6 self-end hover:bg-pink">
          Home
        </button>
      </Link>
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
