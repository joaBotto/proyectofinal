import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getPropertyDetail } from "../../redux/actions";
import ImageModal from "./Modal";
import logo from "../../assets/img/logo.png";

const Gallery = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to open the modal and set the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/2 flex">
      {property.images.length > 0 && (
        <div
          className="relative group cursor-pointer flex-grow"
          onClick={() => openModal(property.images[0])}
        >
          <img
            src={property.images[0].imageUrl}
            alt={`Property Image 0`}
            className="rounded-lg shadow-md transition-transform transform w-full group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-col flex-wrap">
        {property.images.slice(1).map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => openModal(image)}
          >
            <img
              src={image.imageUrl}
              alt={`Property Image ${index + 1}`}
              className="rounded-lg shadow-md transition-transform transform w-1/4 group-hover:scale-105 m-1"
            />
          </div>
        ))}
      </div>
      {isModalOpen && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyDetail(id));
  }, [dispatch, id]);

  const property = useSelector((state) => state.propertyDetail);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mt-4 flex items-center">
        <Link to="/">
          <img className="w-60 pt-4 pl-4" src={logo} alt="Your Company" />
        </Link>
        <div className="ml-auto">
          <Link to="/">
            <a className="text-indigo-950 font-extrabold px-4 py-2 mx-10 mb-2">
              HOME
            </a>
          </Link>
          <Link to="/">
            <a className="text-indigo-950 font-extrabold px-4 py-2  mx-10 mb-2">
              SAVED
            </a>
          </Link>
          <Link to="/">
            <a className="text-indigo-950 font-extrabold px-4 py-2 mx-10 mb-2">
              ABOUT
            </a>
          </Link>
          <Link to="/">
            <button className="bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mx-10 mb-2">
              MY ACCOUNT
            </button>
          </Link>
        </div>
      </div>
      {property && property.title ? (
        <div>
          <h1 className="my-10 text-5xl font-extrabold uppercase text-cyan-300">
            {property.title}
          </h1>
          <p className="text-gray-600">{property.description}</p>
          <Gallery property={property} />
          <div className="mt-4 flex justify-between">
            <div>
              <p className="text-gray-700">{property.bedrooms} Bedrooms</p>
              <p className="text-gray-700">{property.bathrooms} Bathrooms</p>
            </div>
            <p className="text-2xl font-bold text-indigo-900">
              ${property.price}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
