import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "../../App.css";

import apiEndpoint from "../05Services/endpoint";
import AuthContext from "../05Services/AuthContext";
import logo from "../../images/knyg1.png";


axios.defaults.withCredentials = true;

export const LoginContainer = () => {
  const initState = {
    username: "",
    password: "",
    loginError: false,
    loggingIn: false,
  };

  const [data, setData] = React.useState(initState);
  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();
  // const createUserForm = "/createAccount";
  const loginInstance = axios.create();

  loginInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedError) {
        alert("Įvyko klaida, puslapis nurodytu adresu nepasiekiamas");
        dispatch({
          type: "ERROR",
          payload: null,
        });
        setData({
          ...data,
          loginError: false,
          loggingIn: false,
          username: "",
          password: "",
        });
      } else if (error.response) {
        if (error.response.status === 401) {
          setData({
            ...data,
            loginError: true,
            loggingIn: false,
            username: "",
            password: "",
          });
        } else if (error.response.status === 403) {
          alert("Prieiga uždrausta");
          setData({
            ...data,
            loginError: false,
            loggingIn: false,
            username: "",
            password: "",
          });
        }
      }
    }
  );

  const handleChange = (event) => {
    validateText(event);
    setData({
      ...data,
      loginError: false, // po nesėkmingo įvedimo pradėjus vesti duomenis iš naujo, paslepia klaidos pranešimą
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      loginError: false,
      loggingIn: true,
    });
    let userData = new URLSearchParams();
    userData.append("username", data.username);
    userData.append("password", data.password);
    loginInstance
      .post(`${apiEndpoint}/login`, userData, {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      })
      .then((resp) => {
        dispatch({
          type: "LOGIN",
          payload: resp.data,
        });
        history.push("/home");
      })
      .catch(() => {});
  };

  const validateText = (event) => {
    const target = event.target;

    if (target.validity.valueMissing && target.id === "username") {
      target.setCustomValidity("Būtina įvesti naudotojo prisijungimo vardą");
    } else if (target.validity.valueMissing && target.id === "password") {
      target.setCustomValidity("Būtina įvesti slaptažodį");
    } else {
      target.setCustomValidity("");
    }
  };

  // const registrationForm = () => {
  //   history.push(createUserForm);
  // };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100" >
      <div className="card p-5" style={{width: "30%"}}>
        <img
          src={logo}
          alt="Maisto užsakymo iš maitinimo įstaigų informacinė sistema"
          className="img-flex mb-3"
        />
        <form onSubmit={handleSubmit}>
          <h3>Prisijungti</h3>
          <div className="form-group">
            <label htmlFor="username" className="mb-2">
              Naudotojo vardas <span className="fieldRequired">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
              onInvalid={validateText}
              required
              data-toggle="tooltip"
              data-placement="top"
              title="Įveskite naudotojo prisijungimo vardą"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="mt-3 mb-2">
              Slaptažodis <span className="fieldRequired">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              onInvalid={validateText}
              required
              data-toggle="tooltip"
              data-placement="top"
              title="Įveskite naudotojo slaptažodį"
            />
          </div>

          {/* <button
            type="button"
            className="btn btn-link mt-3 text-decoration-none ps-0"
            onClick={() => {
              return ForgotPasswordWindow();
            }}
            formNoValidate
          >
            Pamiršau slaptažodį
          </button> */}

          <button
            type="submit"
            className="btn btn-primary float-end mt-3"
            id="btnLogin"
            disabled={data.loggingIn}
          >
            {data.loggingIn ? "Jungiamasi..." : "Prisijungti"}
          </button>

          {/* <button
            type="button"
            className="btn btn-outline-primary float-end mt-3 me-3"
            id="btnCreate"
            disabled={data.loggingIn}
            onClick={registrationForm}
          >
            Sukurti paskyrą
          </button> */}
        </form>
        {data.loginError && (
          <span
            className="alert alert-danger mt-3"
            role="alert"
            id="incorrectLoginData"
          >
            Neteisingas prisijungimo vardas ir/arba slaptažodis!
          </span>
        )}
      </div>
    </div>
  );
};

export default LoginContainer;
