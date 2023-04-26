import React from "react";
import { Link } from "react-router-dom";


function Login({ changeHandler, loginHandler }) {
  return (
    <>
  
      <h4>Tizimga kirish</h4>
      <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12 m12">
            <input
              type="email"
              name="email"
              className="validate"
              onChange={changeHandler}
              
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12 m12">
            <input
              type="password"
              name="password"
              className="validate"
              onChange={changeHandler}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <button
            className="waves-effect waves-light btn btn blue"
            onClick={loginHandler}
          >
            Kirish
          </button>

          <Link to="/registration" className="btn-outline btn-reg">
            Hisobingiz yo'qmi?
          </Link>
        </div>
      </form>
    </>
  );
}

export default Login;
