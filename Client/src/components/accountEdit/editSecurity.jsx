/* // import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/actions'; // Asegúrate de tener una acción adecuada para actualizar la contraseña

const ChangePassword = () => {
  const dispatch = useDispatch();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que la nueva contraseña coincida con la confirmación
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('La contraseña y la confirmación no coinciden.');
      return;
    }
    // Enviar la solicitud para actualizar la contraseña
    dispatch(updateUser(passwordData));
    
    // Limpiar el formulario después de enviar la solicitud
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
          placeholder="Contraseña Actual"
          required
        />
        <input
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={handleChange}
          placeholder="Nueva Contraseña"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar Nueva Contraseña"
          required
        />
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
 */