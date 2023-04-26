import React, { useState, useContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthPage() {
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      await axios.post(
        "/api/auth/registration",
        { ...form },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error("To'gri ma'lumot kiriting.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { ...form },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(response.data.token, response.data.userId);
    } catch (error) {
      console.log(error.message);

      toast.error("Tizimga kirishda xatolik yuz berdi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <React.Fragment>
          <div className="container">
            <div className="auth-page">
              <ToastContainer />
              <Route path="/login">
                <Login
                  changeHandler={changeHandler}
                  loginHandler={loginHandler}
                />
              </Route>
              <Route path="/registration">
                <ToastContainer />
                <Register
                  changeHandler={changeHandler}
                  registerHandler={registerHandler}
                />
              </Route>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default AuthPage;
