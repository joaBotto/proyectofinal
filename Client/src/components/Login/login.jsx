import "./login.css";
import { Formik } from "formik";
import React from "react";
// Cambios actualizados
export default function Login() {
  let regExPassword = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{1,15}$/;
  let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// const dispatch = useDispatch()
// const onSubmit = (event) => {
//   event.preventDefault()
//   dispatch(actions que mande el mail, y password (www.localhost:3001/auth/login))
// }


          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          console.log("Formulario enviado");
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form className="formulario" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <hr />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Put your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <hr />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Put your password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>
            <button type="submit">Log In</button>
            <button type="submit" className="button">
              Log In with google
            </button>
            <p>
              You still don't have an account? <a href="./signUp"> Sign up</a>
            </p>
            {/* <img src="google.png" alt="google" /> */}
          </form>
        )}
      </Formik>
    </>

}
