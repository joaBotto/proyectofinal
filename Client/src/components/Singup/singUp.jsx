import React, { useState, useRef } from "react";
// import emailjs from "@emailjs/browser";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom"; // Importa
import { addUser } from "../../redux/actions";
import register from "../../assets/img/loginRegister.jpg";
import axios from "axios";
import logo from "../../assets/img/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";

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
    console.log("Imagen recibida", file)
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
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
    image: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Obligatory field"),
    lastName: Yup.string().required("Obligatory field"),
    email: Yup.string().email("Invalid email").required("Obligatory field"),
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

  //----------------------Envio de email----------------------------------
  // const form = useRef();

  // const sendEmail = (values) => {
  //   const serviceID = "service_phq6wkb";
  //   const templateID = "template_d3bst5s";
  //   const publicID = "A88VMvhYNS70XCfHm";

  //   const templateParams = {
  //     from_name: values.name,
  //     to_email: values.email,
  //     subject: "Inmuebles360 :)",
  //     message: "Bienvenido a nuestra plataforma!",
  //   };

  //   emailjs
  //     .sendForm(serviceID, templateID, templateParams, form.current, publicID)
  //     .then((result) => {
  //       alert("Sign Up success: ", result);
  //     })
  //     .catch((error) => {
  //       alert("Something was wrong: ", error);
  //     });
  // };
  //----------------------------------------------------------------------
  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("FormData:", formData);
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
      console.log("soydata de uploadcloud", data);
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Soy el values", values);
    console.log("Soy la imagen", image);
    try {
      if (image) {
        const cloudinaryResponse = await uploadImagesToCloudinary(image);
        console.log("soyresponsecloud", cloudinaryResponse);
        if (cloudinaryResponse) {
          values.images = cloudinaryResponse;
          setImagePreview(values.image);
        } else {
          console.error("Error al cargar la imagen en Cloudinary.");
        }
      }

      //? -------------------------------------------------------------------------------
      // const response = await axios.post("https://localhost:3001/users", values);
      // console.log(response);

      //? -------------------------------------------------------------------------------

      await dispatch(addUser(values));
      // Espera 6 segundos antes de redirigir
      setTimeout(() => {
        // Redirige al usuario a la página de inicio ("/")
        navigate("/login");
      }, 6000); // El tiempo está en milisegundos 
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setSubmitting(false);
      setImage(null);
      setImagePreview("");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between"
      style={{
        backgroundImage: `url(${register})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="font-bold mt-11 font-onest text-4xl text-center text-blue">
        Register Now!
      </h1>
      <div className="bg-white w-1/3 mt-5 rounded-lg p-6 shadow-lg">
        <div className="flex justify-center my-8">
          <img src={logo} alt="Logo" className="w-1/2" />
        </div>
        <div className="mx-5 mt-8">
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
            <Form className="space-y-2">
              <div className="flex flex-row mb-2">
                <div
                  {...getRootProps()}
                  className="flex flex-col justify-center w-1/4 rounded-full-lg border-none"
                >
                  <input {...getInputProps()} />
                  {!imagePreview && (
                    <p className="text-center cursor-pointer text-md font-onest font-semibold text-blue uppercase ">
                      profile photo
                    </p>
                  )}
                  {imagePreview && (
                    <div className="cursor-pointer mt-2 flex justify-start">
                      <img
                        src={imagePreview}
                        alt="vista previa"
                        className="h-[100px] w-[100px] rounded-full"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col w-3/4 justify-center align-middle ml-2">
                  <div className="mb-2">
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
                        className="mt-1 p-2 w-full border rounded-full text-black"
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
                      className="mt-1 p-2 w-full border rounded-full text-black"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
                    />
                  </div>
                </div>
              </div>

              <ToastContainer />

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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
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
                  className="mt-1 p-2 w-full border rounded-full text-black"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-600 text-sm absolute top-0 left-3/4 ml-1 mt-1"
                />
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="justify-center text-center w-1/4 bg-violet font-onest font-semibold text-white px-4 py-2 rounded-full hover:bg-pink"
                >
                  Sign Up
                </button>
                <div className="flex justify-between">
                 
                  <Link to="/">
                    <button className="mt-2 flex justify-end bg-red-500 font-onest text-white px-4 py-2 rounded-full hover:bg-pink">
                      Cancel
                    </button>
                  </Link>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <p className="font-onest mb-11 flex w-1/3 pt-2">
        Already have an account? <Link to="/login"> LogIn</Link>
      </p>
      <Footer />
    </div>
  );
};

export default SignUpForm;
