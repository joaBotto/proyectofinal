import "./login.css";
import { Formik } from "formik";
import React, { useState } from "react";

export default function Login() {
  let regExPassword = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{1,15}$/;
  let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// const dispatch = useDispatch()
// const onSubmit = (event) => {
//   event.preventDefault()
//   dispatch(actions que mande el mail, y password (www.localhost:3001/auth/login))
// }

  return (
    <div>
      <input type="text" />
    </div>
  );
}
