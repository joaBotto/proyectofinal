import React from 'react'
import axios from "axios";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { editProperty } from "../../../redux/actions";
import Dropzone from "react-dropzone";
import Switch from "react-switch";
import Success from "../../modals/Success"
import ModalError from '../../modals/ModalError';
import Loading from '../../modals/loading';

export function EditPropertyFromAdmin() {
  const dispatch = useDispatch();
  const error = useSelector((state)=> state.error)
  const allproperties = useSelector((state)=> state.allproperties)
  const [showModalError, setShowModalError] =useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(true);
  const [showModalLoading, setShowModalLoading] = useState(false)
  
  const { id } = useParams();
  let dates = [];
  const [property, setProperty] = useState({
    title: "",
    description: "",  
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: 0,
    },
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    type: "house",
    availableDays:[],
    availableDates: {
      startDate: new Date(),
      endDate: new Date(),
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
    active: false,
    owner:{}
  });

  console.log("soy property", property);
  console.log("soy availableDates", property.availableDates);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/properties/${id}`)
      .then(({ data }) => {
        if (data) {
          setProperty(data);
          const availableDays = data.availableDays;
          let startDate =
            availableDays.length > 0 ? availableDays[0] : new Date();
          let endDate =
            availableDays.length > 0
              ? availableDays[availableDays.length - 1]
              : new Date();

          startDate = new Date(startDate);
          endDate = new Date(endDate);
          startDate = startDate.toISOString().split("T")[0];
          endDate = endDate.toISOString().split("T")[0];

          setProperty((prevState) => ({
            ...prevState,
            availableDates: {
              startDate: startDate,
              endDate: endDate,
            },
          }));
        }
      })

      .catch((error) => window.alert(error.response.data.error));

    return () => {
      setProperty({});
    };
  }, [id]);

  useEffect(() => {
    setShowModalLoading(false)
    setShowModalSuccess(!showModalSuccess)
  }, [allproperties])

  useEffect(() => {
    setShowModalError(!showModalError)
  },[error])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModalError(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [showModalError]);

  function generateDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(5, "Very short title, must be at least 5 characters long"),
    description: Yup.string().required("Description is required"),
    address: Yup.object().shape({
      street: Yup.string().required("The street is required"),
      city: Yup.string().required("The city is required"),
      state: Yup.string().required("State is required"),
      zipcode: Yup.number().required("Zip code is required"),
    }),
    bedrooms: Yup.number()
      .required("Number of rooms is required")
      .min(0)
      .max(10),
    bathrooms: Yup.number()
      .required("Number of bathrooms required")
      .min(0)
      .max(10),
    price: Yup.number().required("Price is required").min(1).max(100000),
    availableDates: Yup.object().shape({
      startDate: Yup.date()
        .required("Required start date")
        .min(new Date(), "The start date should be from today"),
      endDate: Yup.date()
        .required("Required completion date")
        .min(Yup.ref("startDate"), "The end date must be later than the start date"),
    }),
    images: Yup.array()
      .required("You must add at least 5 images")
      .test("is-images-length", "You must add at least 5 images", (images) => {
        return images && images.length === 5;
      }),
  });

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      const { data } = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
    }
  };



  return (
    <div className="flex flex-col w-screen font-noto">
      {showModalSuccess && Success("The post has been edited successfully", "/")}
      {showModalError && ModalError(error)}
      {showModalLoading && Loading()}
      <Formik
        initialValues={property}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          let propertyEdited = {};
          const {
            title,
            description,
            address,
            bedrooms,
            bathrooms,
            price,
            type,
            availableDays,
            images,
            amenities,
            additional,
            active,
            owner,
            _id,
            __v } = values;

            if (dates.length > 0 ) {
             propertyEdited = {
                title,
                description,
                address,
                bedrooms,
                bathrooms,
                price,
                type,
                availableDays:dates,
                images,
                amenities,
                additional,
                active,
                owner,
                _id,
                __v 
              }
            } else {
             propertyEdited = {
              title,
              description,
              address,
              bedrooms,
              bathrooms,
              price,
              type,
              availableDays,
              images,
              amenities,
              additional,
              active,
              owner,
              _id,
              __v 
            }
          }
            console.log("soy el objeto a mandar", propertyEdited)
            setShowModalLoading(true)
            dispatch(editProperty(propertyEdited))
            setSubmitting(false);
            
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="bg-white flex flex-col rounded-xl p-6 shadow-lg my-10 w-1/2 mx-auto items-center">
              <button className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
              onClick={() => window.history.back()}>
                BACK
              </button>
            <h1 className="text-5xl font-semibold text-left mb-4 text-gray-700">
              Edit Post
            </h1>
           
            {/* TITULO DE LA PUBLICACION */}
            <div className="block text-left text-gray-700">
              <label htmlFor="title">Title:</label>
              <Field
                type="text"
                name="title"
                className="mt-1 p-2 w-full rounded-full border,color:red"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-600 text-sm"
              />
            
            {/* DESCRIPCION */}
           
              <label htmlFor="description">Description:</label>
              <Field
                as="textarea"
                name="description"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm"
              />
        
            {/* DIRECCION */}
            
              <label htmlFor="Address" className="block">
                Address:
              </label>
              <label htmlFor="address.street">Street:</label>
              <Field
                type="text"
                name="address.street"
                className="mt-1 p-2 w-full rounded-full border "
              />
              <ErrorMessage
                name="address.street"
                component="div"
                className="text-red-600 text-sm"
              />

              <label htmlFor="address.city">City:</label>
              <Field
                type="text"
                name="address.city"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="address.city"
                component="div"
                className="text-red-600 text-sm"
              />

              <label htmlFor="address.state">State:</label>
              <Field
                type="text"
                name="address.state"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="address.state"
                component="div"
                className="text-red-600 text-sm"
              />

              <label htmlFor="address.zipcode">Zipcode:</label>
              <Field
                type="number"
                name="address.zipcode"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="address.zipcode"
                component="div"
                className="text-red-600 text-sm"
              />
           

            {/* CANT DE CAMAS */}
            
              <label htmlFor="bedrooms">Bedrooms:</label>
              <Field
                type="number"
                name="bedrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="bedrooms"
                component="div"
                className="text-red-600 text-sm"
              />
            
            {/* CANT DE BANOS */}
           
              <label htmlFor="bathrooms">Bathrooms:</label>
              <Field
                type="number"
                name="bathrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="bathrooms"
                component="div"
                className="text-red-600 text-sm"
              />
            
            {/* PRECIO */}
            
              <label htmlFor="price">Price:</label>
              <Field
                type="number"
                name="price"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 text-sm"
              />
            
            {/* TIPO(CASA-DEPTO-PH) */}
           
              <label htmlFor="type">Type:</label>
              <Field
                as="select"
                name="type"
                className="mt-1 p-2 w-full rounded-full border"
              >
                <option value="house">HOUSE</option>
                <option value="depto">APPARTMENT</option>
                <option value="ph">PH</option>
              </Field>
            
            {/* COMODIDADES(METROS2-ANTIGUEDAD-GARAGE-GRILL-CALEFACCION) */}
           
              <p>Amenities</p>

              <label htmlFor="amenities.covered_area">Covered_area:</label>
              <Field
                type="number"
                name="amenities.covered_area"
                className="mt-1 p-2 w-full rounded-full border text-black"
              />
              <ErrorMessage
                name="amenities.covered_area"
                component="div"
                className="text-red-600 text-sm"
              />
              <label htmlFor="amenities.antique">Antique:</label>
              <Field
                type="number"
                name="amenities.antique"
                className="mt-1 p-2 w-full rounded-full border text-black"
              />
              
                <ErrorMessage name="amenities.antique" component="div" />
                <label style={{ display: "block" }}>
                  
                    <p>Additional</p>
                    <label style={{ display: "block", marginBottom: "10px" }}>
                      <Field type="checkbox" name="amenities.garage" />
                      Garage
                    </label>
                    <label style={{ display: "block", marginBottom: "10px" }}>
                      <Field type="checkbox" name="amenities.grill" />
                      Grill
                    </label>
                    <label style={{ display: "block", marginBottom: "10px" }}>
                      <Field type="checkbox" name="amenities.heating" />
                      Heating
                    </label>
                
                  <Field type="checkbox" name="additional.swimmingpool" />
                  Swimming Pool
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.terrace" />
                  Terrace
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.dining_room" />
                  Dining_Room
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.washing_machine" />
                  Washing_Machine
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.internet_wifi" />
                  Internet_Wifi
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.refrigerator" />
                  Refrigerator
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.microwave" />
                  Microwave
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.coffee_maker" />
                  Coffee_Maker
                </label>
                <label style={{ display: "block", marginBottom: "10px" }}>
                  <Field type="checkbox" name="additional.patio" />
                  Patio
                </label>
                <label style={{ display: "block", marginBottom: "15px" }}>
                  <Field type="checkbox" name="additional.balcony_patio" />
                  Balcony_Patio
                </label>
                <p>
                La Fecha de disponibilidad de esta propiedad es la siguiente, si
                la desea modificar ingrese nuevos valores:
              </p>
           

            
              
              <label htmlFor="availableDates.startDate">Fecha de inicio:</label>
              <Field name="availableDates.startDate" type="date" />
              <ErrorMessage name="availableDates.startDate" component="div" />
              <label htmlFor="availableDates.endDate">
                Fecha de finalizacion:
              </label>
              <Field
                name="availableDates.endDate"
                type="date"
                onChange={(event) => {
                  const endDateValue = event.target.value;
                  setFieldValue("availableDates.endDate", endDateValue);
                  const startDateValue = values.availableDates.startDate;

                  if (startDateValue && endDateValue) {
                    const startDate = new Date(startDateValue);
                    const endDate = new Date(endDateValue);
                    dates = generateDatesInRange(startDate, endDate);
                    console.log(dates);
                  }
                }}
              />
              <ErrorMessage name="availableDays.endDate" component="div" />
            </div>

            
            <FieldArray name="images">
              {({ remove }) => (
                <div className="image-container flex flex-row mt-8">
                  {values.images &&
                    values.images.map((image, index) => (
                      <div key={index} className="w-1/5 h-full">
                        <div className="w-full">
                        <img
                          src={image.imageUrl}
                          alt={image.imageUrl}
                          className="w-full h-40"
                        />
                        </div>
                        <div>
                        <button
                        className="block mx-auto bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Delete
                        </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </FieldArray>
           

            <Dropzone
              onDrop={async (acceptedFiles) => {
                if (values.images.length + acceptedFiles.length <= 5) {
                  const uploadImageUrl = await uploadImagesToCloudinary(
                    acceptedFiles
                  );
                  console.log("soy la devolucion del back", uploadImageUrl);
                  const newImages = [...values.images, uploadImageUrl];
                  setFieldValue("images", newImages);
                } else {
                  alert("No puedes subir más de 5 imágenes."); // PASAR ALERT A INGLES
                }
              }}
              accept="image/*"
              multiple={false}
              className="dropzone"
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <p className="text-black">
                    Arrastra y suelta archivos aquí o haz clic para seleccionar
                    (máximo 5 imágenes)
                  </p>
                </div>
              )}
            </Dropzone>

            <div className="block text-left text-gray-700">
              <label htmlFor="active">Active posting:</label>
              <Switch
                onChange={(value) => setFieldValue("active", value)}
                checked={values.active}
              />
            </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-1/3 bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
              >
                Edit
              </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
