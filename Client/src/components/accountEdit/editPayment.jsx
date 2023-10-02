/* // import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '../../redux/actions';

const EditPayment = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [paymentData, setPaymentData] = useState({
    cardNumber: user.cardNumber,
    expirationDate: user.expirationDate,
    cvv: user.cvv,
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar la solicitud para actualizar la información de la tarjeta
    dispatch(updatePayment(paymentData));
  };

  return (
    <div>
      <h2>Editar Información de Tarjeta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          placeholder="Número de Tarjeta"
          value={paymentData.cardNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expirationDate"
          placeholder="Fecha de Expiración"
          value={paymentData.expirationDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentData.cvv}
          onChange={handleChange}
        />
        <button type="submit">Guardar Información de Tarjeta</button>
      </form>
    </div>
  );
};

export default EditPayment;
 */