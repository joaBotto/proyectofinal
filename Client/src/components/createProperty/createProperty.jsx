import React, { useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { createProperty } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/img/loginRegister.jpg";
import { Link, useNavigate } from "react-router-dom"; // Importa
import "./createProperty.css";
import logo from "../../assets/img/logo.png";
import { useState } from "react";

import Successful from "./Modals/SucessModal"
import Error from "./Modals/ErrorModal";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";



export default function CreateProperty() {
  const user = useSelector((state) => state.user);
  // console.log("soy el usuario en createProperty", user);
  let dates = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [PropertyCreated, setPropertyCreated] = useState(false); // Estado para el mensaje de éxito
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);


  useEffect(() => {
    if (!user) {
      // Si el usuario no está definido, redirige a la página de inicio de sesión
      navigate("/login");
    }
  }, [user, navigate]);

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      const { data } = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };
  function generateDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
	const LocationSearchInput = ({ field, form: { setFieldValue } }) => {
		const handleChange = (address, isSuggestion) => {
			// console.log('handleChange:', address, isSuggestion);
		  
			if (!address) {
			  setFieldValue('address.street', '');
			  setFieldValue('address.city', '');
			  setFieldValue('address.locality', '');
			  setFieldValue('address.state', '');
			  setFieldValue('address.zipcode', ''); 
			  setFieldValue('address.lat', ''); 
              setFieldValue('address.lng', ''); 
			} else {
			  setFieldValue('address.street', address);
			  if (isSuggestion) {
				handleSelect(address);
			  }
			}
		  };
	  
		const handleZipcodeChange = (e) => {
			// console.log('handleZipcodeChange:', handleZipcodeChange);
			const zipcode = e.target.value;
			setFieldValue('address.zipcode', zipcode);
		  };
		
		  const [zipcode, setZipcode] = useState('');

		  const handleSelect = (address) => {
			geocodeByAddress(address)
			  .then((results) => {
				const result = results[0];
				return Promise.all([
				  getLatLng(result),
				  result.address_components,
				  result.formatted_address,
				]);
			  })
			  .then(([latLng, addressComponents, formattedAddress]) => {
				// console.log('Geocoding success', latLng, addressComponents);
				
				setFieldValue('address.locality', extractAddressComponent(addressComponents, 'locality'));
				setFieldValue('address.city', extractAddressComponent(addressComponents, 'administrative_area_level_1'));
				setFieldValue('address.state', extractAddressComponent(addressComponents, 'country'));
				setFieldValue('address.lat', latLng.lat);
				setFieldValue('address.lng', latLng.lng);
				const zipcode = extractAddressComponent(addressComponents, 'postal_code');
				setFieldValue('address.zipcode', zipcode);
				
				// Guardar el código postal en la variable de estado "zipcode"
				setZipcode(zipcode);
			  })
			  .catch((error) => {
				console.error('Geocoding error', error);
				console.error('Geocoding error', error);
              setFieldValue('address.zipcode', '');
              setFieldValue('address.lat', '');
              setFieldValue('address.lng', '');
              setZipcode('');
			  });
		  };
		  
		  const handleSuggestionClick = ( suggestion) => {
			// console.log('Sugerencia clicada:', suggestion);
			setFieldValue('address.street', suggestion);
			handleSelect(suggestion);
		  };
		  

		const extractAddressComponent = (addressComponents, type) => {
		  const component = addressComponents.find((comp) => comp.types.includes(type));
		  return component ? component.long_name : '';
		};
	  

		return (
		  <div>
			<PlacesAutocomplete
			  value={field.value.street}
			  onChange={(address) => handleChange(address, false)}
			 
			  onSelect={(address) => handleSelect(address)}
			  googleCallbackName="initOne"
			>
			  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div className="block pt-5 text-left text-gray-700">
				  <input 
					{...getInputProps({
					 
					  placeholder: 'Street ...',
					  className:"mt-1 p-2 w-full rounded-full border",
					})}
				  />
				  <ErrorMessage
					name="address.street"
					component="div"
					className="text-red-600 text-sm"
				  />
				  <div className="autocomplete-dropdown-container">
				  
				  {loading && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-2">
					  <svg
						style={{ animation: 'spin 1s linear infinite', color: '#ed64a6' }}
						className="h-5 w-5 mr-3"
						viewBox="0 0 24 24"
					  >
					  </svg>
					  Processing
					</div>
				  )}
				  
					{suggestions.map((suggestion) => { 
					  const className = suggestion.active
						? 'suggestion-item--active'
						: 'suggestion-item';
					  const style = suggestion.active
						? { backgroundColor: '#fafafa', cursor: 'pointer' }
						: { backgroundColor: '#ffffff', cursor: 'pointer' };
					  return (
						<div
						  {...getSuggestionItemProps(suggestion, {
							className,
							style,
							onClick: () => handleSuggestionClick(suggestion.description),
              
						  })}
						>
						  <span><p class="italic ...">{suggestion.description}</p></span>
						  
						</div>
						
					  );
					})}
					</div> 
				</div>
			  )}
			</PlacesAutocomplete>
	  
			<div className="block pt-5 text-left text-gray-700">
			  <input 
				type="text"
				value={field.value.locality}
				
				placeholder="Locality"
			
				className="mt-1 p-2 w-full rounded-full border "
				readOnly
			  />
			</div>
			<div className="block pt-5 text-left text-gray-700">
        <input
          type="text"
          value={field.value.city}
          placeholder="City"
          className="mt-1 p-2 w-full rounded-full border"
          readOnly
        />
      </div>
      <div className="block pt-5 text-left text-gray-700">
        <input
          type="text"
          value={field.value.state}
          placeholder="State"
          className="mt-1 p-2 w-full rounded-full border"
          readOnly
        />
      </div>
	  <div className="block pt-5 text-left text-gray-700">
      <input
        type="text"
		placeholder="Zipcode"
        value={field.value.zipcode}
        onChange={handleZipcodeChange}
		className="mt-1 p-2 w-full rounded-full border"
		readOnly
      />
    </div>
    </div>
  );
};

	

  const initialValues = {
    address: {
			street: "",
			locality: "",
			city: "",
			state: "",
			zipcode: "", 
			lat:"",
			lng:"",
		  },
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    type: "House",
    availableDates: {
      startDate: "",
      endDate: "",
    },
    images: [],
    amenities: {
      covered_area: 0,
      garage: false,
      antique: 0,
      grill: false,
      heating: false,
    },
    additional: {
      swimmingpool: false,
      terrace: false,
      dining_room: false,
      washing_machine: false,
      internet_wifi: false,
      refrigerator: false,
      microwave: false,
      coffee_maker: false,
      patio: false,
      balcony_patio: false,
    },
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const {
      title,
      additional,
      address,
      amenities,
      bathrooms,
      bedrooms,
      description,
      images,
      price,
      type,
    } = values;
    const newProperty = {
      title,
      additional,
      address,
      amenities,
      availableDays: dates,
      bathrooms,
      bedrooms,
      description,
      images,
      owner: user ? user._id : null,
      price,
      type,
    };
    // console.log("soy la info a mandar", newProperty);

    try {
      await dispatch(createProperty(newProperty, setShowSuccessModal, setShowErrorModal));
      // setTimeout(() => {
      //   navigate("/");
      // }, 7000);
    } catch (error) {
      console.error("Error creating property:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Very short title, must be at least 5 characters long")
      .max(47, "Title too long"),
    description: Yup.string().required("Description is required"),
    address: Yup.object().shape({
      street: Yup.string().required("The street is required"),
     
    }),
    amenities: Yup.object().shape({
      covered_area: Yup.number()
        .required("Covered area is required")
        .min(10, "Must be 10 or more"),
      antique: Yup.number()
        .required("Antiquity is required")
        .min(0, "Must be 0 or more"),
    }),
    bedrooms: Yup.number()
      .required("Number of rooms is required")
      .min(1, "Add at least 1 bedroom")
      .max(10, "Max 10 bedrooms"),
    bathrooms: Yup.number()
      .required("Number of bathrooms required")
      .min(1, "Add at least 1 bathroom")
      .max(10, "Max 10 bedrooms"),
    price: Yup.number().required("Price is required").min(1).max(100000),
    availableDates: Yup.object().shape({
      startDate: Yup.date()
        .required("Required start date")
        .min(new Date(), "The start date should be from today"),
      endDate: Yup.date()
        .required("Required completion date")
        .min(
          Yup.ref("startDate"),
          "The end date must be later than the start date"
        ),
    }),
    images: Yup.array().test(
      "at-least-five-images",
      "Add at least 5 images",
      (value) => {
        return value.length >= 5;
      }
    ),
  });

  return (
    <div className="w-screen items-center justify-center bg-white">
      <div className="flex flex-col">
        <NavBar />
        <div className="ml-6 flex flex-col relative">
          <h1 className="absolute bottom-[130px] text-5xl font-onest font-extrabold uppercase text-violet pb-3">
            REGISTER YOUR PROPERTY
          </h1>
          <h1 className="absolute bottom-[60px] text-3xl font-onest font-extrabold uppercase text-white">
            START EARNING EXTRA INCOME WITH YOUR HOME <br />
            AS SIMPLE AS INMUEBLES360
          </h1>
        </div>
        {showSuccessModal && (<Successful setShowSuccessModal = {setShowSuccessModal}/> )}
        {showErrorModal && (<Error setShowErrorModal = {setShowErrorModal}/> )}
        <div className="flex flex-row justify-center w-screen">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting, setFieldValue, isValid, dirty }) => (
              <Form className="flex flex-row justify-center w-3/4 bg-violet bg-opacity-10 rounded-xl shadow-xl p-20 my-10">
                <div className="flex flex-col w-1/2 space-y-4">
                  {/* TITULO DE LA PUBLICACION */}
                  {/* <ToastContainer /> */}
                  <div className="block text-left text-gray-700">
                    <label
                      htmlFor="title"
                      className="pl-2 font-onest text-blue font-semibold text-lg"
                    >
                      Name your property:
                    </label>
                    <Field
                      type="text"
                      name="title"
                      placeholder="PROPERTY TITLE"
                      className="mt-1 p-2 w-full rounded-lg border,color:red"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  {/* DESCRIPCION */}
                  <div className="block text-left text-gray-700">
                    <label
                      htmlFor="description"
                      className="pl-2 font-onest text-blue font-semibold text-lg"
                    >
                      Give a full description of your property:
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="DESCRIPTION"
                      className="mt-1 p-2 w-full rounded-lg border"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  {/* DIRECCION */}
                  <div className="block pt-5 text-left text-gray-700">
                    <label htmlFor="Address" />
                    <p className="pt-5 pl-1 font-onest text-blue font-semibold text-lg">
                      Address:
                    </p>
                    <Field
                      component={LocationSearchInput}
                      name="address"
                      setFieldValue={setFieldValue}
                    />
                    {/* <label htmlFor="address.zipcode"></label>
                    <Field
                      type="number"
                      name="address.zipcode"
                      placeholder="Zip Code"
                      className="mt-1 p-2 w-full rounded-full border"
                    />
                    <ErrorMessage
                      name="address.zipcode"
                      component="div"
                      className="text-red-600 text-sm"
                    /> */}
                    
                  </div>
                  <p className="pt-5 pl-1 font-onest text-blue font-semibold text-lg">
                    Property's Characteristics
                  </p>
                  <div className="flex flex-row mx-2 space-x-3">
                    <div className="w-1/4">
                      <label
                        htmlFor="amenities.covered_area"
                        className="text-blue text-sm font-onest font-thin"
                      >
                        Total Area:
                      </label>
                      <Field
                        type="number"
                        min="1"
                        name="amenities.covered_area"
                        className="mt-1 p-2 w-full rounded-full border text-black"
                      />
                      <ErrorMessage
                        name="amenities.covered_area"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div className="w-1/4">
                      <label
                        htmlFor="amenities.antique"
                        className="text-blue text-sm font-onest font-thin"
                      >
                        Antiquity:
                      </label>
                      <Field
                        type="number"
                        min="0"
                        name="amenities.antique"
                        className="mt-1 p-2 w-full rounded-full border text-black"
                      />
                      <ErrorMessage
                        name="amenities.antique"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    {/* CANT DE CAMAS */}
                    <div className="w-1/4 block text-left text-gray-700">
                      <label
                        htmlFor="bedrooms"
                        className="text-blue text-sm font-onest font-thin"
                      >
                        Bedrooms:
                      </label>
                      <Field
                        type="number"
                        min="0"
                        name="bedrooms"
                        className="mt-1 p-2 w-full rounded-full border"
                      />
                      <ErrorMessage
                        name="bedrooms"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    {/* CANT DE BANOS */}
                    <div className="w-1/4 block text-left text-gray-700">
                      <label
                        htmlFor="bathrooms"
                        className="text-blue text-sm font-onest font-thin"
                      >
                        Bathrooms:
                      </label>
                      <Field
                        type="number"
                        min="0"
                        name="bathrooms"
                        className="mt-1 p-2 w-full rounded-full border"
                      />
                      <ErrorMessage
                        name="bathrooms"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row">
                    {/* TIPO(CASA-DEPTO-PH) */}
                    <div className="w-full block text-left text-gray-700">
                      <label
                        htmlFor="type"
                        className="pt-5 pl-1 font-onest text-blue font-semibold text-lg"
                      >
                        Select your property type:
                      </label>
                      <Field
                        as="select"
                        name="type"
                        className="mt-1 p-2 w-full rounded-full border"
                      >
                        <option value="House">House</option>
                        <option value="Appartment">Appartment</option>
                        <option value="Horizontal Property">
                          Horizontal Property
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col ml-11 pt-9">
                  {/* COMODIDADES(METROS2-ANTIGUEDAD-GARAGE-GRILL-CALEFACCION) */}
                  <div className="flex flex-col">
                    <p className="pl-1 font-onest text-blue font-semibold text-lg">
                      Amenities
                    </p>
                    <div className="relative">
                      <div className="flex justify-start font-onest">
                        <div className="flex flex-col mr-10">
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="amenities.garage"
                              className="form-checkbox"
                            />
                            <span>Garage</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="amenities.grill"
                              className="form-checkbox"
                            />
                            <span>Grill</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="amenities.heating"
                              className="form-checkbox"
                            />
                            <span>Heating</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.swimmingpool"
                              className="form-checkbox"
                            />
                            <span>Swimming Pool</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.terrace"
                              className="form-checkbox"
                            />
                            <span>Terrace</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.dining_room"
                              className="form-checkbox"
                            />
                            <span>Dining Room</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.washing_machine"
                              className="form-checkbox"
                            />
                            <span>Washing Machine</span>
                          </label>
                        </div>
                        <div className="flex flex-col pl-6">
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.internet_wifi"
                              className="form-checkbox"
                            />
                            <span>Internet WiFi</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.refrigerator"
                              className="form-checkbox"
                            />
                            <span>Refrigerator</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.microwave"
                              className="form-checkbox"
                            />
                            <span>Microwave</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.coffee_maker"
                              className="form-checkbox"
                            />
                            <span>Coffee Maker</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.patio"
                              className="form-checkbox"
                            />
                            <span>Patio</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Field
                              type="checkbox"
                              name="additional.balcony_patio"
                              className="form-checkbox"
                            />
                            <span>Balcony Patio</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-left mt-4">
                    <p className="pt-5 pl-1 font-onest text-blue font-semibold text-lg">
                      Availability:
                    </p>
                    <div className="flex">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="availableDates.startDate"
                          className="pl-1 ml-2 font-onest text-blue font-light text-lg"
                        >
                          From:
                        </label>
                        <Field
                          name="availableDates.startDate"
                          type="date"
                          className="rounded-full text-blue"
                        />
                        <ErrorMessage
                          name="availableDates.startDate"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div className="flex flex-col w-1/2 ml-3">
                        <label
                          htmlFor="availableDates.endDate"
                          className="pl-1 ml-2 font-onest text-blue font-light text-lg"
                        >
                          To:
                        </label>
                        <Field
                          name="availableDates.endDate"
                          type="date"
                          className="rounded-full text-blue"
                          onChange={(event) => {
                            const endDateValue = event.target.value;
                            setFieldValue(
                              "availableDates.endDate",
                              endDateValue
                            );
                            const startDateValue =
                              values.availableDates.startDate;

                            if (startDateValue && endDateValue) {
                              const startDate = new Date(startDateValue);
                              const endDate = new Date(endDateValue);
                              dates = generateDatesInRange(startDate, endDate);
                              // console.log(dates);
                            }
                          }}
                        />
                        <ErrorMessage
                          name="availableDays.endDate"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="pt-5 pl-1 font-onest text-blue font-semibold text-lg">
                    Add at least 5 images:{" "}
                  </p>
                  <Dropzone
                    onDrop={async (acceptedFiles) => {
                      if (values.images.length + acceptedFiles.length >= 0) {
                        const uploadImageUrl = await uploadImagesToCloudinary(
                          acceptedFiles
                        );
                        // console.log(
                        //   "soy la devolucion del back",
                        //   uploadImageUrl
                        // );
                        const newImages = [...values.images, uploadImageUrl];
                        setFieldValue("images", newImages);
                      }
                    }}
                    accept="image/*"
                    multiple={false}
                    className="dropzone"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="dropzone cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        <p className="text-blue font-noto text-xs">
                          Drag and drop your files here or click to select.
                        </p>
                        <div className="image-container overflow-scroll space-x-2 space-y-2">
                          {" "}
                          {/* Agrega la clase "image-container" aquí */}
                          {values.images &&
                            values.images.map(
                              (e) =>
                                e &&
                                e.imageUrl && (
                                  <img
                                    style={{
                                      maxWidth: "10em",
                                      maxHeight: "10em",
                                    }}
                                    key={e.imageUrl}
                                    src={e.imageUrl}
                                    alt={e.imageUrl}
                                  />
                                )
                            )}
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                  {/* PRECIO */}
                  <div className="flex flex-row justify-end text-right text-blue mt-4">
                    <p className="flex items-center pl-1 font-onest text-blue font-semibold text-2xl mx-3">
                      U$D p/day:
                    </p>
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="price"></label>
                      <Field
                        type="number"
                        name="price"
                        className="mt-1 p-2 w-full rounded-full border"
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-600 text-sm block"
                      />
                    </div>
                  </div>
                  <div className="flex mt-24 justify-end">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        !dirty ||
                        (values.images && values.images.length < 5)
                      }
                      className={`mt-10 block font-onest font-bold text-white px-4 py-2 bg-violet rounded-full hover:bg-pink mb-2 ${
                        (isSubmitting ||
                          !isValid ||
                          !dirty ||
                          (values.images && values.images.length < 5)) &&
                        "bg-gray-400 hover:cursor-not-allowed hover:bg-gray-600"
                      }`}
                      onClick={(e) => {
                        e.preventDefault(); // Evitar que el formulario se envíe automáticamente
                        handleSubmit(values, { setSubmitting: () => {} }); // Llamar a la función handleSubmit con los valores y un objeto "setSubmitting" vacío
                        // console.log(
                        //   "Soy la info a comprobar por que no funciona",
                        //   values
                        // );
                      }}
                    >
                      Registry your property
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </div>
  );
}