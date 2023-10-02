
import React, { useState } from "react";
import { connect, useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { addUser } from '../../redux/actions';
import register from "../../assets/img/loginRegister.jpg"
import axios from "axios";

const URL = "http://localhost:3000";



const SignUpForm = () => {
  const [isFormValid, setFormValid] = useState(false);
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("");
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

const onDrop = (acceptedFiles) => {
    // `acceptedFiles` contiene la lista de archivos seleccionados por el usuario
    const file = acceptedFiles[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.onload = () => {
      // Al cargar el archivo, establecer la URL de la imagen en el estado
      setImagePreview(reader.result);
    };

    // Leer el archivo como URL
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png', // Aceptar solo archivos de imagen
    onDrop,
  });



  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    address: "",
    city: "",
    phonenumber: "",
    avatar: null,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Campo obligatorio"),
    lastName: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Campo obligatorio"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Campo obligatorio"),
      country: Yup.string().required("Campo obligatorio"),
  address: Yup.string().required("Campo obligatorio"),
  city: Yup.string().required("Campo obligatorio"),
  phonenumber: Yup.string().required("Campo obligatorio"),
  });

  const handleValidation = (isValid) => {
    setFormValid(isValid);
  };

  const uploadImagesToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);
    try {
      const { data } = await axios.post(`${URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      console.error("Error al cargar la imagen:", error);
      throw error; 
    }
  };
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (values.images) {
        const cloudinaryResponse = await uploadImagesToCloudinary(values.images);
        values.avatar = cloudinaryResponse.secure_url;
        setImagePreview(values.avatar);
      }
  
      // Solicitud al backend
      const response = await axios.post(`${URL}/users`, values);
      console.log('Datos enviados al servidor:', values);
  
      // Aquí puedes despachar una acción de Redux si es necesario
      dispatch(addUser(values));
  
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
          validateOnBlur={false}   // Evitar la validación automática al salir de un campo
          validate={values => {
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
                  <p className="cursor-pointer">Arraste o seleciones una foto de perfil.</p>
              </div>
              {/* Mostrar la vista previa de la imagen */}
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="vista previa" className="  h-32 max-w-full mt-2" />
          </div>
        )}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <Field type="text" id="firstName" name="firstName" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Apellido:
            </label>
            <Field type="text" id="lastName" name="lastName" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico:
            </label>
            <Field type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <Field type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña:
            </label>
            <Field type="password" id="confirmPassword" name="confirmPassword" className="mt-1 p-2 w-full border rounded" />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
          </div>
          <div>
  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
    País:
  </label>
  <Field type="text" id="country" name="country" className="mt-1 p-2 w-full border rounded" />
  <ErrorMessage name="country" component="div" className="text-red-600 text-sm" />
</div>

<div>
  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
    Dirección:
  </label>
  <Field type="text" id="address" name="address" className="mt-1 p-2 w-full border rounded" />
  <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
</div>

<div>
  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
    Ciudad:
  </label>
  <Field type="text" id="city" name="city" className="mt-1 p-2 w-full border rounded" />
  <ErrorMessage name="city" component="div" className="text-red-600 text-sm" />
</div>

<div>
  <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">
    Número de teléfono:
  </label>
  <Field type="text" id="phonenumber" name="phonenumber" className="mt-1 p-2 w-full border rounded" />
  <ErrorMessage name="phonenumber" component="div" className="text-red-600 text-sm" />
</div>

          <div className="flex justify-between">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >Registrarse</button>
            <Link to="/" className=" absolute top-0 left-0 text-blue-500 hover:text-blue-700 font-bold p-2 " >
              Dashboard
            </Link>
          </div>
        </Form>
      </Formik>
  </div>
 
  
  </div>
    
    );
  };

export default connect(null, { addUser })(SignUpForm);