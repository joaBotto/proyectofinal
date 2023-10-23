import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import fondo from "../../assets/img/loginRegister.jpg";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(formData));
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
                  {/*      <label className="text-sm text-violet ">
                    {field}
                  </label> */}
                  <div className="  flex justify-between items-center mb-3">
                    <label className=" text-sm text-blue font-bold ">{field}:</label>
                    <span>{formData[field]}</span>
                    <button
                      type="button"
                      onClick={() => toggleEditMode(field)}
                      className="text-blue font-bold hover:text-cyan"
                    >
                      Edit
                    </button>
                  </div>
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
