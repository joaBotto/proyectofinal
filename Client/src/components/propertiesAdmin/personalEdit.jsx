import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";
import * as Yup from "yup";
import Success from "./modals/successEditUse";
import ModalError from "./modals/errorEditUse";
import axios from "axios";
import { useDropzone } from "react-dropzone";

const EditAccount = () => {
  const user = useSelector((state) => state.user);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    image: user.image,
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
    country: user.country,
    city: user.city,
    address: user.address,
    phoneNumber: user.phoneNumber, 
  });

  const [editMode, setEditMode] = useState({
    image: false,
    email: false,
    password: false,
    name: false,
    lastName: false,
    country: false,
    city: false,
    address: false,
    phoneNumber: false,
  });

  const [errors, setErrors] = useState({
    image: "",
    email: "",
    password: "",
    name: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const [image, setImage] = useState(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Dirección de correo inválida")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es obligatoria"),
    name: Yup.string()
      .max(15, "El nombre debe tener menos de 15 caracteres")
      .matches(/^[A-Za-z ]*$/, "El nombre no debe contener números")
      .required("El nombre es obligatorio"),
    lastName: Yup.string()
      .max(15, "El apellido debe tener menos de 15 caracteres")
      .matches(/^[A-Za-z ]*$/, "El apellido no debe contener números")
      .required("El apellido es obligatorio"),
    country: Yup.string()
      .matches(/^[A-Za-z ]*$/, "El país no debe contener números")
      .required("El país es obligatorio"),
    city: Yup.string()
      .matches(/^[A-Za-z ]*$/, "La ciudad no debe contener números")
      .required("La ciudad es obligatoria"),
    address: Yup.string().required("La dirección es obligatoria"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "El número de teléfono debe ser numérico")
      .required("El número de teléfono es obligatorio"),
  });

  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        // Actualiza la vista previa de la imagen
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setEditMode({ ...editMode, image: true });
      setIsNewImageSelected(true);
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      try {
        // Lógica para cargar la imagen en Cloudinary aquí
        const cloudinaryResponse = await uploadImagesToCloudinary(image);
        if (cloudinaryResponse) {
          formData.image = cloudinaryResponse.imageUrl;
        } else {
          console.error("Error al cargar la imagen en Cloudinary.");
        }
      } catch (error) {
        console.error("Error al cargar la imagen en Cloudinary:", error);
      }
    }

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        dispatch(updateUser(formData));
        setShowModalSuccess(true);
      })
      .catch((validationErrors) => {
        validationErrors.inner.forEach((error) => {
          setErrors({ ...errors, [error.path]: error.message });
          setShowModalError(true);
        });
      });
  };

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen en Cloudinary:", error);
      throw error;
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
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              {editMode[field] ? (
                <div>
                  <div className="  flex justify-between items-center mb-3">
                    <label
                      htmlFor={field}
                      className="text-sm text-cyan font-bold"
                    >
                      Change you {field}
                    </label>
                    {field === "image" ? (
                      <>
                        <div {...getRootProps()} className="flex flex-col">
                          <input {...getInputProps()} />
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Vista previa"
                              className="h-[100px] w-[100px] rounded-full"
                            />
                          ) : (
                            <p className="text-center cursor-pointer text-md font-onest font-semibold text-blue uppercase">
                              click here
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <input
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full p-2 rounded border mb-2"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => toggleEditMode(field)}
                      className="text-blue font-bold hover:text-cyan"
                    >
                      Save
                    </button>
                  </div>
                  {errors[field] && (
                    <p className="text-red-600">{errors[field]}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="  flex justify-between items-center mb-3">
                    <label className="text-sm text-blue font-bold">
                      {field}:
                    </label>
                    {field === "image" ? (
                      <>
                        {isNewImageSelected ? (
                          <img
                            src={imagePreview}
                            alt="Vista previa"
                            className="h-[100px] w-[100px] rounded-full"
                          />
                        ) : formData.image ? (
                          <img
                            src={formData.image}
                            alt="Imagen existente"
                            className="h-[100px] w-[100px] rounded-full"
                          />
                        ) : (
                          <p>No hay imagen existente</p>
                        )}
                      </>
                    ) : (
                      <span>{formData[field]}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleEditMode(field)}
                      className="text-blue font-bold hover:text-cyan"
                    >
                      Edit
                    </button>
                  </div>
                  {errors[field] && (
                    <p className="text-red-600">{errors[field]}</p>
                  )}
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-violet text-white py-2 px-4 rounded mt-2 mb-2 hover:bg-pink w-80"
          >
            Save changes
          </button>
        </form>
        <Link to="/">
          {" "}
          {/* Aquí va /gestionUser */}
          <button className="bg-blue text-white py-2 px-4 rounded hover:bg-teal-400 w-full">
            Back to Home
          </button>
        </Link>
        {showModalSuccess && (
          <Success
            message="¡Los cambios se han guardado exitosamente!"
            route="/"
          />
        )}
        {showModalError && (
          <ModalError
            message="Por favor, complete el formulario correctamente."
            onClose={() => setShowModalError(false)}
          />
        )}
      </div>
    </div>
  );
};

export default EditAccount;
