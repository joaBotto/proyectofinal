import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import axios from 'axios';

// cloudName:ddupuyeko
// apiKey:658737721611119
// apiSecret:eSNh4zfR7yPVJ88YhOd5ln9S3R4


const validationSchema = Yup.object().shape({
  title: Yup.string().required("El título es requerido"),
  description: Yup.string().required("La descripción es requerida")
});


export default function CreateProperty () {
 
  const initialValues = {
    title: "",
    description: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    bedrooms: 0,
    bathrooms: 0,
    type: "casa",
    availableDays: null,
    images: [], 
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Realizar acciones con los valores del formulario
    console.log(values);
    // No olvides llamar a setSubmitting(false) cuando hayas terminado con las acciones asincrónicas
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <label htmlFor="title">Title:</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" />
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <label htmlFor="description">Description:</label>
              <Field as="textarea" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em', flexDirection:'column'}}>
              <label htmlFor="Address">Address:</label>
              <label htmlFor="street">Street:</label>
              <Field type="text" name="street" />
              <ErrorMessage name="street" component="div" />
              <label htmlFor="city">City:</label>
              <Field type="text" name="city" />
              <ErrorMessage name="city" component="div" />
              <label htmlFor="state">State:</label>
              <Field type="text" name="state" />
              <ErrorMessage name="state" component="div" />
              <label htmlFor="zipcode">Zipcode:</label>
              <Field type="number" name="zipcode" />
              <ErrorMessage name="zipcode" component="div" />
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <label htmlFor="bedrooms">Bedrooms:</label>
              <Field type="number" name="bedrooms" />
              <ErrorMessage name="bedrooms" component="div" />
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <label htmlFor="bathrooms">Bathrooms:</label>
              <Field type="number" name="bathrooms" />
              <ErrorMessage name="bathrooms" component="div" />
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <Field as="select" name="type">
                <option value="casa">casa</option>
                <option value="depto">depto</option>
                <option value="ph">PH</option>
              </Field>
            </div>

            <div style={{ marginTop: '1em', marginBottom: '1em' }}>
              <label htmlFor="availableDays">Available days:</label>
              <DatePicker
                selected={values.vacationDate}
                onChange={(date) => setFieldValue("availableDays", date)}
                name="availableDays"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <Dropzone
              onDrop={async (acceptedFiles) => {
                if (acceptedFiles.length <= 5) {
                  const uploadedImages = await Promise.all(acceptedFiles.map((image) => { 
                  const { data } = axios(cloudinary.url(image.name))
                  return data.secure_url
                }))                
                setFieldValue("images", uploadedImages);
                } else {
                  alert("No puedes subir más de 5 imágenes."); // PASAR ALERT A INGLES
                }
              }}
              accept="image/*"
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} 
                className="dropzone"
                style={{
                  background: "white",
                  width: "200px", // Cambia el valor de acuerdo a tus necesidades
                  height: "200px", // Cambia el valor de acuerdo a tus necesidades
                  margin: "1em 0", // 1 em de margen arriba y abajo
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                >
                  <input {...getInputProps()} />
                  <p>
                    Arrastra y suelta archivos aquí o haz clic para seleccionar
                    (máximo 5 imágenes)
                  </p>
                </div>
              )}
            </Dropzone>

            <button type="submit" disabled={isSubmitting} style={{ background:'blue', marginTop: '1em', marginBottom: '1em' }}>
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
