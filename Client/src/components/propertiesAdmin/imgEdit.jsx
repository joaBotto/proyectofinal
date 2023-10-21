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
import Success from "./modals/Success"
import ModalError from './modals/ModalError';
import Loading from './modals/loading';

export function EditPropertyFromAdmin() {
  const dispatch = useDispatch();
  const error = useSelector((state)=> state.error)
  const allproperties = useSelector((state)=> state.allproperties)

  const { id } = useParams();
  let dates = [];
  const [user, setUser] = useState({
  
    images: [],
   
  });

  console.log("soy user", user);


  
  const validationSchema = Yup.object().shape({
    
    images: Yup.array()
      .required("You must add at least 5 images")
      .test(
        "is-images-length",
        "You must add between 5 and 10 images",
        (images) => {
          return images && images.length >= 5 && images.length <= 10;
        }
      ),
  });





  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      const { data } = await axios.post(
        "/upload",
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
      <Formik
        initialValues={property}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          let propertyEdited = {};
          const {
        
            images,
         
} = values;
            
if (dates.length > 0 ) {
          
                propertyEdited = {
              
                images,
              }
            } else {
             propertyEdited = {
           
              images,
            }
          }
            console.log("soy el objeto a mandar", propertyEdited)
          
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
                  const uploadImageUrl = await uploadImagesToCloudinary(
                    acceptedFiles
                  );
                  console.log("soy la devolucion del back", uploadImageUrl);
                  const newImages = [...values.images, uploadImageUrl];
                  setFieldValue("images", newImages);    
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
            <ErrorMessage name="images" component="div" className="text-red-600 text-sm" />

        
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
