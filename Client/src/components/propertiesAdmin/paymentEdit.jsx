/* import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
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

  const userEdited = {
    ...user,
    paymentInfo: formData,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userEdited));
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
        <h2 className="text-2xl mb-4 text-blue font-bold">Edit Payment Information</h2>
        {user.paymentInfo ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="cardNumber" className="text-sm text-cyan font-bold">
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
            <label htmlFor="expirationDate" className="text-sm text-cyan font-bold">
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
            <label htmlFor="cvv" className="text-sm text-cyan font-bold">
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
              className="bg-violet text-white py-2 px-4 rounded hover:bg-pink w-full"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p>No payment card information registered.</p>
        )}
        <Link to="/gestionUser">
          <button className="bg-blue text-white py-2 px-4 rounded hover:bg-teal-400 w-full">
            Return to User Management
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditPaymentInfo; */


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";

const EditPaymentInfo = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const simulatedPaymentInfo = {
    cardNumber: "1234 5678 9012 3456",
    expirationDate: "12/25",
    cvv: "123",
  };
  const [formData, setFormData] = useState({
    cardNumber: user.paymentInfo?.cardNumber || simulatedPaymentInfo.cardNumber, //simulacion temporal
    expirationDate: user.paymentInfo?.expirationDate || "",
    cvv: user.paymentInfo?.cvv || "",
  });

  const [editMode, setEditMode] = useState({
    cardNumber: false,
    expirationDate: false,
    cvv: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userEdited = { ...user, paymentInfo: formData };
    dispatch(updateUser(userEdited));
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
        <h2 className="text-2xl mb-4 text-blue font-bold">Edit Payment Information</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              {editMode[field] ? (
                <div className="  flex justify-between items-center mb-3">
                  <label htmlFor={field} className="text-sm text-cyan font-bold">
                    Change your {field}
                  </label>
                  <input
                    type={field === "cardNumber" ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 rounded border mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => toggleEditMode(field)}
                    className="text-blue font-bold hover:text-cyan"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  <div className="  flex justify-between items-center mb-3">
                    <label className=" text-sm text-blue font-bold ">{field}:</label>
                    <span>{formData[field]}
                      <button
                        type="button"
                        onClick={() => toggleEditMode(field)}
                        className="text-blue font-bold hover:text-cyan ml-2"
                      >
                        Edit
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-violet text-white py-2 px-4 rounded mt-2 mb-2 hover:bg-pink w-full"
          >
            Save Changes
          </button>
        </form>
        <Link to="/gestionUser">
          <button className="bg-blue text-white py-2 px-4 rounded hover:bg-teal-400 w-full">
            Return to User Management
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditPaymentInfo;
