import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { Link } from "react-router-dom";
//import { updateUser } from "../../redux/actions";

function SavedProperties() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h2 className="sm:text-5xl text-xl font-black text-violet left-7 leading-[1.2] font-onest">
        My Favorites
      </h2>
      <Link to={"/"}>
        <button className="bg-blue text-white font-onest font-light px-10 py-2 ml-0 rounded-full self-end hover:bg-pink">
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
