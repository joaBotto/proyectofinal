import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { addUser } from "../../redux/actions";
import register from "../../assets/img/loginRegister.jpg";
import axios from "axios"; // Asegúrate de importar axios si aún no lo has hecho

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [isFormValid, setFormValid] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const user = useSelector((state) => state.user);

  const onDrop = (acceptedFiles) => {
    // `acceptedFiles` contiene la lista de archivos seleccionados por el usuario
    const file = acceptedFiles[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    // Leer el archivo como URL
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png", // Aceptar solo archivos de imagen
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
    name: Yup.string().required("Campo obligatorio"),
    lastName: Yup.string().required("Campo obligatorio"),
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Campo obligatorio"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("Campo obligatorio"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Campo obligatorio"),
    country: Yup.string().required("Campo obligatorio"),
    address: Yup.string().required("Campo obligatorio"),
    city: Yup.string().required("Campo obligatorio"),
    phoneNumber: Yup.string().required("Campo obligatorio"),
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
      console.log("soydata de uploadcloud", data)
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (image) {
        const cloudinaryResponse = await uploadImagesToCloudinary(image);
        console.log("soyresponsecloud", cloudinaryResponse)
        if (cloudinaryResponse) {
          values.avatar = cloudinaryResponse;
          setImagePreview(values.avatar);
        } else {
          console.error("Error al cargar la imagen en Cloudinary.");
        }
      }

      // Llamamos a la acción addUser para enviar datos al servidor
      await dispatch(addUser(values));
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setSubmitting(false);
      setImage(null);
      setImagePreview("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${register})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Registrate</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false} // Evitar la validación automática en cada cambio
          validateOnBlur={false} // Evitar la validación automática al salir de un campo
          validate={(values) => {
            const errors = {};
            // Validación adicional: Verificar la complejidad de la contraseña
            const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[/*-]).{8,}$/;
            if (!passwordPattern.test(values.password)) {
              errors.password =
                "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, un número y uno de los siguientes signos: /, * o -";
            }
            // Calcula si el formulario es válido
            const isValid = Object.keys(errors).length === 0;
            handleValidation(isValid);

            return errors;
          }}
        >
          <Form className="space-y-4">
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p className="cursor-pointer cursor-pointer pt-4 text-lg leading-6 font-onest font-semibold text-blue uppercase ">
                Arraste o seleciones una foto de perfil.
              </p>
            </div>
            {/* Mostrar la vista previa de la imagen */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="vista previa"
                  className="  h-32 max-w-full mt-2"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Apellido:
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico:
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña:
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600 text-sm "
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña:
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                País:
              </label>
              <Field
                type="text"
                id="country"
                name="country"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="country"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección:
              </label>
              <Field
                type="text"
                id="address"
                name="address"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad:
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número de teléfono:
              </label>
              <Field
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 p-2 w-full border rounded text-black"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold py-2 px-4 rounded-md"
              >
                Registrarse
              </button>
              <Link
                to="/"
                className=" absolute top-0 left-0 text-blue-500 hover:text-blue-700 font-bold p-2 "
              >
                Dashboard
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
