import("./createProperty.css");
import React from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import { createProperty } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import fondo from "../../assets/img/loginRegister.jpg";
import { Link } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida"),
});

export default function CreateProperty() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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

  const initialValues = {
    title: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    bedrooms: 0,
    bathrooms: 0,
    price: 0,
    type: "casa",
    availableDays: [],
    images: [],
    owner: "651459f5da45532a97080dee", // CAMBIAR A "user._id" cuando este terminado el login
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const convertToDate = values.availableDays.map((e) => new Date(e));
    values.availableDays = convertToDate;

    console.log("soy la info a mandar", values);

    dispatch(createProperty(values));
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-fuchsia-900"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="bg-white rounded-lg p-6 shadow-lg my-10">
            <h1 className="text-5xl font-semibold text-left mb-4 text-gray-700">
              Register your property
            </h1>
            <Link to="/">
              <button className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2">
                Home
              </button>
            </Link>
            <div className="block text-left text-gray-700">
              <label htmlFor="title">Title:</label>
              <Field
                type="text"
                name="title"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="title" component="div" />
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="description">Description:</label>
              <Field
                as="textarea"
                name="description"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="description" component="div" />
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="Address" className="block">
                Address:
              </label>
              <label htmlFor="address.street">Street:</label>
              <Field
                type="text"
                name="address.street"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.street" component="div" />
              <label htmlFor="address.city">City:</label>
              <Field
                type="text"
                name="address.city"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.city" component="div" />
              <label htmlFor="address.state">State:</label>
              <Field
                type="text"
                name="address.state"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.state" component="div" />
              <label htmlFor="address.zipcode">Zipcode:</label>
              <Field
                type="number"
                name="address.zipcode"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="address.zipcode" component="div" />
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="bedrooms">Bedrooms:</label>
              <Field
                type="number"
                name="bedrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="bedrooms" component="div" />
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="bathrooms">Bathrooms:</label>
              <Field
                type="number"
                name="bathrooms"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="bathrooms" component="div" />
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="price">Price:</label>
              <Field
                type="number"
                name="price"
                className="mt-1 p-2 w-full rounded-full border"
              />
              <ErrorMessage name="price" component="div" />
            </div>

            <div className="block text-left text-gray-700">
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
            </div>

            <div className="block text-left text-gray-700">
              <label htmlFor="availableDays">Available days:</label>
              <DatePicker
                selected={null}
                onChange={(date) =>
                  setFieldValue("availableDays", [
                    ...values.availableDays,
                    date,
                  ])
                }
                name="availableDays"
                dateFormat="dd/MM/yyyy"
                className="react-datepicker"
              />
            </div>
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
                  {values.images &&
                    values.images.map(
                      (e) =>
                        e &&
                        e.imageUrl && (
                          <img
                            style={{ maxWidth: "10em", maxHeight: "10em" }}
                            key={e.imageUrl}
                            src={e.imageUrl}
                            alt={e.imageUrl}
                          />
                        )
                    )}
                  {!values.images && (
                    <p className="text-black">
                      Arrastra y suelta archivos aquí o haz clic para
                      seleccionar (máximo 5 imágenes)
                    </p>
                  )}
                </div>
              )}
            </Dropzone>
            <button
              type="submit"
              disabled={isSubmitting}
              className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
