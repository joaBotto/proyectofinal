import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";
import {  ErrorMessage, FieldArray } from "formik";
import Dropzone from "react-dropzone";
const EditAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
    country: user.country,
    city: user.city,
    address: user.address,
    phoneNumber: user.phoneNumber,
    images:user.images
    // //images

  });

  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
    name: false,
    lastName: false,
    country: false,
    city: false,
    address: false,
    phoneNumber: false,
   images: []
  // //images
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
  };

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
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url(${fondo})`,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md"
        style={{ maxWidth: "385px" }}
      >
        <h2 className="text-2xl mb-4 text-blue font-bold">Edit Account</h2>
     
              <button className="block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2"
              onClick={() => window.history.back()}>
                BACK
              </button>
 
       
       
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              {editMode[field] ? (
                <div className="  flex justify-between items-center mb-3">
                  <label htmlFor={field} className="text-sm text-cyan font-bold">
                    Change your {field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 rounded border mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => toggleEditMode(field)}
                    className="text-blue font-bold hover:text-cyan"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {/*      <label className="text-sm text-violet ">
                    {field}
                  </label> */}
                  <div className="  flex justify-between items-center mb-3">
                    <label className=" text-sm text-blue font-bold ">{field}:</label>
                    <span>{formData[field]}</span>
                    <button
                      type="button"
                      onClick={() => toggleEditMode(field)}
                      className="text-blue font-bold hover:text-cyan"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-violet text-white py-2 px-4 rounded mt-2 mb-2 hover:bg-pink w-80"
          >
            Save Changes
          </button>
        </form>
        <Link to="/gestionUser">
          <button className="bg-blue text-white py-2 px-4 rounded hover:bg-teal-400 w-full">
            Return to User Management
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditAccount;
// const uploadImagesToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file[0]);
  //   try {
  //     const { data } = await axios.post(
  //       "/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     return data;
  //   } catch (error) {
  //     console.error("Error al cargar la imagen:", error);
  //   }
  // };

       
{/* 
            <FieldArray name="images">
              {({ remove }) => (
                <div className="image-container flex flex-row mt-8">
                  {user.images &&
                    user.images.map((image, index) => (
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
                  const newImages = [...images, uploadImageUrl];
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
        */}