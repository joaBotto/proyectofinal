import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getPropertyDetail,
  cleanDetail,
  getAllBookings,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLocationDot,
  faBed,
  faBath,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import ImageCarousel from "../../components/Card/ImageCarousel";
import ImageGalleryModal from "./Modal";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { FadeLoader } from "react-spinners";
import DisplayCharacteristics from "./Display";
import BookingDetails from "./Booking";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const property = useSelector((state) => state.propertyDetail);
  console.log(property);

  useEffect(() => {
    dispatch(getPropertyDetail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const originalStartDate =
    property && property.availableDays && property.availableDays[0];
  const formattedStartDate = originalStartDate
    ? new Date(originalStartDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const originalEndDate =
    property &&
    property.availableDays &&
    property.availableDays[property.availableDays.length - 1];
  const formattedEndDate = originalEndDate
    ? new Date(originalEndDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const PropertyMap = ({ property }) => {
    const [map, setMap] = useState(null);

    const containerStyle = {
      width: "100%",
      height: "300px",
    };

    const center = {
      lat: property.address.lat,
      lng: property.address.lng,
    };

    useEffect(() => {
      if (map) {
      }
    }, [map]);

    return (
      <LoadScript googleMapsApiKey="AIzaSyCMqyxMkdWUUM4OpLB2iWXZ2c4rsYEfvRo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  };

  //*IMAGE GALLERY---------------------------------------------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white w-screen h-screen overflow-x-hidden">
      <NavBar />
      {property && property.title ? (
        <div className="w-full px-10 mx-10 py-20">
          <div>
            <div className="w-full mb-7 flex justify-between">
              <div>
                <h1 className="text-5xl font-onest font-extrabold uppercase text-cyan">
                  {property.title}
                </h1>
              </div>
              <div className="">
                <button className=" flex justify-end text-white bg-transparent rounded-full mr-6">
                  <Link
                    to="/"
                    className="mt-1 mr-2 justify-center text-blue font-onest font-semibold"
                  >
                    RETURN
                  </Link>
                  <FontAwesomeIcon
                    icon={faHouse}
                    className="bg-cyan text-blue  py-2 px-2 rounded-full justify-center shadow-lg"
                  />
                </button>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex flex-row h-[500px]">
                <div className="w-full overflow-hidden rounded-xl shadow-xl">
                  <ImageCarousel images={property.images} />
                </div>
                <div className="w-full flex flex-row flex-wrap justify-start overflow-x-hidden overflow-y-scroll">
                  <p className="ml-5 text-blue font-onest font-bold underline pb-3">
                    ♥︎ SAVE PROPERTY
                  </p>
                  <div className="flex flex-row flex-wrap">
                    {property.images.map((image, index) => (
                      <div className="flex flex-row flex-wrap ">
                        <img
                          key={index}
                          src={image.imageUrl}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-[250px] w-[300px] cursor-pointer m-1 filter grayscale hover:grayscale-0 rounded-md"
                          onClick={() => openModal(image)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-blue font-noto font-bold pb-3">
                Available from {formattedStartDate || "null"} to{" "}
                {formattedEndDate || "null"}
              </p>
              <div className="w-1/2 h-10 grid grid-cols-3 gap-3 place-items-stretch">
                <div className="flex justify-center items-center rounded-md bg-cyan uppercase">
                  <p className="text-sm text-blue text-center font-bold font-onest">
                    <FontAwesomeIcon icon={faBed} className="mr-2" />{" "}
                    {property.bedrooms} Bedroom/s
                  </p>
                </div>
                <div className="flex justify-center items-center rounded-md bg-cyan uppercase">
                  <p className="text-sm font-bold text-blue text-center font-onest">
                    <FontAwesomeIcon icon={faBath} className="mr-2" />
                    {property.bathrooms} Bathroom/s
                  </p>
                </div>
                <div className="flex justify-center items-center rounded-md bg-cyan">
                  <p className="text-sm font-bold text-blue text-center font-onest">
                    <FontAwesomeIcon icon={faRulerCombined} />{" "}
                    {property.amenities.covered_area} m²
                  </p>
                </div>
              </div>
              <p className="flex justify-end text-4xl text-blue font-onest font-extrabold mr-2 pr-20 py-3">
                U$D {property.price}
              </p>
              <div className="w-full justify-center align-middle items-center flex flex-row pr-20">
                <div className="w-1/2 flex flex-col mr-11">
                  <p className="text-3xl text-blue font-onest font-extrabold pt-3">
                    DESCRIPTION
                  </p>
                  <p className="text-md text-blue font-noto text-justify font-light pb-3">
                    {property.description}
                  </p>
                </div>
                <div className="w-1/4 h-full border-2 border-cyan rounded-xl mt-3 pb-5">
                  <p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
                    PROPERTY OWNER
                  </p>
                  <div className="flex flex-col md:flex-row items-center pl-5">
                    {/* <div className="flex  rounded-full">
											{property.owner?.images[0]?.imageUrl ? (
												<Avatar
													size={{
														xs: 24,
														sm: 32,
														md: 40,
														lg: 64,
														xl: 80,
														xxl: 100,
													}}
													src={property.owner.images[0].imageUrl}
												/>
											) : (
												<Avatar
													size={{
														xs: 24,
														sm: 32,
														md: 40,
														lg: 64,
														xl: 80,
														xxl: 100,
													}}
													icon={<UserOutlined />}
												/>
											)}
										</div> */}
                    <p className="text-xs text-blue font-noto text-left font-light py-2 px-2">
                      {property.owner.name} from {property.owner.city},{" "}
                      {property.owner.country}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 ml-3 h-full border-2 border-cyan rounded-xl mt-3 pb-5">
                  <p className="text-xl text-blue font-onest font-extrabold pt-3 px-5">
                    PROPERTY REVIEWS
                  </p>
                  <div className="flex flex-col md:flex-row items-center pl-5">
                    <div className="flex  rounded-full">
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 80,
                          xxl: 100,
                        }}
                        icon={<UserOutlined />}
                      />
                    </div>
                    <p className="text-xs text-blue font-noto text-left font-light py-2 px-2">
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Facilis possimus neque adipisci maiores."
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-row mt-8 pr-20">
                <div className="w-1/2">
                  <p className="text-4xl text-blue font-onest font-extrabold py-3">
                    LOCATION
                  </p>
                  <p className="text-md mt-1 pb-0 mb-0 font-noto font-medium text-blue uppercase">
                    <FontAwesomeIcon icon={faLocationDot} />{" "}
                    {property.type || "Property"} in {property.address.street}
                  </p>
                  <div>
                    <PropertyMap property={property} />
                  </div>
                </div>
                {property && <DisplayCharacteristics property={property} />}
              </div>
              <div className="w-full flex flex-col items-end justify-end pr-20 pt-11">
                {property && <BookingDetails property={property} />}
              </div>
            </div>
            {isModalOpen && (
              <ImageGalleryModal
                images={property.images}
                selectedImage={selectedImage}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-screen">
          <FadeLoader color="#54086B" />
        </div>
      )}
      <div className="p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
