import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import fondo from "../../assets/img/loginRegister.jpg";

const EditPaymentInfo = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    cardNumber: user.paymentInfo?.cardNumber || "",
    expirationDate: user.paymentInfo?.expirationDate || "",
    cvv: user.paymentInfo?.cvv || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userEdited = { // Crear un nuevo objeto con la información de pago
    ...user,
    paymentInfo: formData
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userEdited)); // Enviar el objeto con información de pago
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
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-2xl mb-4">Edit Payment Information</h2>
        {user.paymentInfo ? ( // Check if the user has payment information
          <form onSubmit={handleSubmit}>
            <label htmlFor="cardNumber" className="text-sm text-gray-600">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-2 rounded border mb-4"
            />
            <label htmlFor="expirationDate" className="text-sm text-gray-600">
              Expiration Date
            </label>
            <input
              type="text"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              placeholder="Expiration Date"
              className="w-full p-2 rounded border mb-4"
            />
            <label htmlFor="cvv" className="text-sm text-gray-600">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="w-full p-2 rounded border mb-4"
            />
            <button
              type="submit"
              className="bg-violet text-white py-2 px-4 rounded hover-bg-pink w-full"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p>No payment card information registered.</p>
        )}
      </div>
    </div>
  );
};

export default EditPaymentInfo;
