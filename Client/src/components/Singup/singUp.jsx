import React, { useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import register from "../../assets/img/loginRegister.jpg"


const SignUpForm = () => {
  const [isFormValid, setFormValid] = useState(false);
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    addres: "",
    city: "",
    phonenumber: "",
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

  const handleSubmit = (values) => {
    console.log(values);
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

export default SignUpForm;
