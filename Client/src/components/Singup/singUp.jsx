import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Importa 
import { addUser } from "../../redux/actions";
import register from "../../assets/img/loginRegister.jpg";
import axios from "axios";
import logo from "../../assets/img/logo.png"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setFormValid] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [userCreated, setUserCreated] = useState(false); // Estado para el mensaje de éxito
  const user = useSelector((state) => state.user);
  const [isToastVisible, setToastVisibility] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png",
    onDrop,
  });

  const initialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    address: "",
    city: "",
    phoneNumber: "",
    avatar: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Obligatory field"),
    lastName: Yup.string().required("Obligatory field"),
    email: Yup.string()
      .email("Invalid email")
      .required("Obligatory field"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Obligatory field"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Obligatory field"),
    country: Yup.string().required("Obligatory field"),
    address: Yup.string().required("Obligatory field"),
    city: Yup.string().required("Obligatory field"),
    phoneNumber: Yup.number().required("Obligatory field"),
  });

  const handleValidation = (isValid) => {
    setFormValid(isValid);
  };

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
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
      console.log("soydata de uploadcloud", data);
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Soy el values",values)
    try {
      if (image) {
        const cloudinaryResponse = await uploadImagesToCloudinary(image);
        console.log("soyresponsecloud", cloudinaryResponse);
        if (cloudinaryResponse) {
          values.avatar = cloudinaryResponse;
          setImagePreview(values.avatar);
        } else {
          console.error("Error al cargar la imagen en Cloudinary.");
        }
      }


      await dispatch(addUser(values));
      // Espera 2 segundos antes de redirigir
     setTimeout(() => {
       // Redirige al usuario a la página de inicio ("/")
       navigate("/login");
     }, 7000); // El tiempo está en milisegundos (en este caso, 2 segundos)
      
    } catch (error) {
    } finally {
      setSubmitting(false);
      setImage(null);
      setImagePreview("");
    }
  };

  return (
    <div
    className="min-h-0 w-screen flex items-center justify-center "
      style={{
        backgroundImage: `url(${register})`,
        backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    
      }}
    >
  
      <div className="flex justify-end items-center absolute top-0 left-0 px-24 py-6 ">
  <img
    src={logo}
    alt="Logo"
    className="w-auto h-16 "
  />

</div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className=" font-bold mb-4 text-5xl text-center text-blue">Sign up</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
          validate={(values) => {
            const errors = {};
            const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
            if (!passwordPattern.test(values.password)) {
              errors.password =
                "It must contain at least 8 characters, a capital letter, a number and one of the following signs: /, * o -";
            }
            const isValid = Object.keys(errors).length === 0;
            handleValidation(isValid);
            return errors;
          }}
        >
          <Form className="space-y-4">
          
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p className="cursor-pointer  pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase ">
              Drag or select a profile photo
              </p>
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="vista previa"
                  className="  h-32 max-w-full mt-2"
                />
              </div>
            )}
<ToastContainer />
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {/* Nombre: */}
              </label>
    <div className="relative">
    <Field
      type="text"
      id="name"
      name="name"
      placeholder="Name"
      className="mt-1 p-2 w-full border rounded text-black"
    />
    <ErrorMessage
      name="name"
      component="div"
      className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
    />
          </div>
        </div>

            <div className="relative">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Apellido: */}
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Correo Electrónico: */}
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Contraseña: */}
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm "
              />
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Confirmar Contraseña: */}
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                {/* País: */}
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Dirección: */}
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Ciudad: */}
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                {/* Número de teléfono: */}
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
              />
            </div>
               

<div className="flex justify-center mt-4">
    <button
      type="submit"
      className="bg-pink text-white font-onest font-light px-4 py-2 rounded-full mx-6 my-4 self-end"
    >
      Sign up
    </button>
  </div>

  <Link to= "/">
				<div className="flex justify-end items-center absolute top-0 right-20">
					<button className="bg-blue text-white font-onest font-light px-6 py-6 rounded-full mx-6 my-4 self-end">
						Home
					</button>
				</div>
			</Link>
</Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;