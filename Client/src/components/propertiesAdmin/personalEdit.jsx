 // import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";

const EditAccount = () => {
  const user = useSelector((state) => state.user); // Obténer los datos del usuario desde el estado de Redux
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    lastName: user.lastName,
    images: user.images,
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
    dispatch(updateUser(formData));
  };

  return (
    <div>
      <h2>Editar Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="País"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ciudad"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Número de Teléfono"
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditAccount;