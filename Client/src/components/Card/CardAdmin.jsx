import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faBath,
  faRulerCombined,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "./ImageCarousel";
import Delete from "../admin/editProperty/modals/Delete"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { propertyDelete } from "../../redux/actions"

const CardAdmin = ({
  _id,
  title,
  description,
  price,
  images,
  location,
  bedrooms,
  bathrooms,
  area, 
}) => {
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(false)

  const okDelete = async (_id) => {
      setShowModalDelete(false)
      console.log("SOY EL ID A ELIMINAR", _id)
      dispatch(propertyDelete(_id))
  }

  const cancelDelete = () => {
    setShowModalDelete(false)
  }

  return (
    <div className="flex-auto rounded-xl py-2">
      {showModalDelete && (<Delete okDelete={okDelete} cancelDelete={cancelDelete} _id={_id} />)}
      <div className="px-4 pt-5 sm:px-6">
        <div className="relative rounded-xl h-[300px] shadow overflow-hidden">
          <ImageCarousel images={images} />
        </div>
        <Link to={`/detail/${_id}`}>
          <h3 className="pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase">
            {title?.slice(0, 20)}
          </h3>
        </Link>
      </div>
      <div className="mx-6 grid grid-rows-3 gap-y-2 font-onest">
        <p className="text-sm mt-1 pb-0 mb-0 font-medium text-blue">
          <FontAwesomeIcon icon={faLocationDot} /> {location}
        </p>
        <p className="text-3xl text-right mb-2 font-bold text-blue">
          U$D {price}
        </p>
        <div className="grid grid-cols-3 gap-3 place-items-stretch">
          <div className="flex justify-center items-center rounded-md bg-cyan">
            <p className="text-sm font-medium text-blue text-center">
              {bedrooms} <FontAwesomeIcon icon={faBed} />
            </p>
          </div>
          <div className="flex justify-center items-center rounded-md bg-cyan">
            <p className="text-sm font-medium text-blue text-center">
              {bathrooms} <FontAwesomeIcon icon={faBath} />
            </p>
          </div>
          <div className="flex justify-center items-center rounded-md bg-cyan">
            <p className="text-sm font-medium text-blue text-center">
              <FontAwesomeIcon icon={faRulerCombined} /> {area} m²
            </p>
          </div>
        </div>
      </div>
      <p className="mx-6 text-sm pb-0 mt-3 text-justify font-noto font-medium text-blue">
        {description?.slice(0, 100)}...
      </p>
      <div className="flex justify-between items-center">
        <Link to={`/admin/property/${_id}`}>
          <button className="bg-blue text-white font-onest font-light px-4 py-2 rounded-full mx-4 my-4 self-end hover:bg-pink">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
        </Link>
        <button
          onClick={() => setShowModalDelete(true)}
          className="bg-blue text-white font-onest font-light px-4 py-2 rounded-full mx-4 my-4 self-end hover:bg-pink"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
};

export default CardAdmin;
