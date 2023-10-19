// import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";

const EditAccount = () => {
  const user = useSelector((state) => state.user); // Obténer los datos del usuario desde el estado de Redux
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
    //images: user.images,
    country: user.country,
    city: user.city,
    address: user.address,
    phoneNumber: user.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud para actualizar la cuenta del usuario
    console.log("soyformdata", formData);
    dispatch(updateUser(formData));
  };

  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url(${fondo})`, // Establece la imagen de fondo
        minHeight: "100vh", // Establece la altura al 100% de la pantalla
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-2xl mb-4">Editar Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-sm text-gray-600">
            change your Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo Electrónico"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="password" className="text-sm text-gray-600">
            change your Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="name" className="text-sm text-gray-600">
            change your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="lastName" className="text-sm text-gray-600">
            change your last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="country" className="text-sm text-gray-600">
            change your country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="País"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="city" className="text-sm text-gray-600">
            change your city
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ciudad"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="address" className="text-sm text-gray-600">
            change your address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
            className="w-full p-2 rounded border mb-4"
          />
          <label htmlFor="phoneNumber" className="text-sm text-gray-600">
            change your phoneNumber
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Número de Teléfono"
            className="w-full p-2 rounded border mb-4"
          />
          <button
            type="submit"
            className="bg-violet text-white py-2 px-4 rounded hover:bg-pink w-full"
          >
            Guardar Cambios
          </button>
        </form>
        <Link to="/gestionUser">
          <button className="bg-blue text-white py-2 px-4 rounded hover:bg-teal-400 w-full">
            Regresar a Gestion de Usuario
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditAccount;
