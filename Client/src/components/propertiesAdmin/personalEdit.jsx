import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";
import * as Yup from "yup";

const EditAccount = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
    country: user.country,
    city: user.city,
    address: user.address,
    phoneNumber: user.phoneNumber,
  });

  const [editMode, setEditMode] = useState({
    email: false,
    password: false,
    name: false,
    lastName: false,
    country: false,
    city: false,
    address: false,
    phoneNumber: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    name: Yup.string()
      .max(15, "Name should be less than 15 characters")
      .matches(/^[A-Za-z ]*$/, "Name should not contain numbers")
      .required("Name is required"),
    lastName: Yup.string()
      .max(15, "Last name should be less than 15 characters")
      .matches(/^[A-Za-z ]*$/, "Last name should not contain numbers")
      .required("Last name is required"),
    country: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Country should not contain numbers")
      .required("Country is required"),
    city: Yup.string()
      .matches(/^[A-Za-z ]*$/, "City should not contain numbers")
      .required("City is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone number is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar en tiempo real
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((error) => {
        setErrors({ ...errors, [name]: error.errors[0] });
      });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        dispatch(updateUser(formData));
      })
      .catch((validationErrors) => {
        // Manejar errores de validación, por ejemplo, mostrarlos al usuario
        validationErrors.inner.forEach((error) => {
          setErrors({ ...errors, [error.path]: error.message });
        });
      });
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
        style={{ maxWidth: "385px" }}
      >
        <h2 className="text-2xl mb-4 text-blue font-bold">Edit Account</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field}>
              {editMode[field] ? (
                <div className="  flex justify-between items-center mb-3">
                  <label htmlFor={field} className="text-sm text-cyan font-bold">
                    Change your {field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
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
                    <label className="text-sm text-blue font-bold">{field}:</label>
                    <span>{formData[field]}</span>
                    <button
                      type="button"
                      onClick={() => toggleEditMode(field)}
                      className="text-blue font-bold hover:text-cyan"
                    >
                      Edit
                    </button>
                  </div>
                  {errors[field] && <p className="text-red-600">{errors[field]}</p>}
                </div>
              )}
            </div>
      
          ))}
          <button
            type="submit"
            className="bg-violet text-white py-2 px-4 rounded mt-2 mb-2 hover:bg-pink w-80"
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

export default EditAccount;
