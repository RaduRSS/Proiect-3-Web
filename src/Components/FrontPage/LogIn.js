import React, { useState } from "react";
import "./LogIn.css";
import {Link} from 'react-router-dom'

function LogIn() {

  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const login =()=>{
    if(username !== undefined && password!== undefined){
      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("access_token", data.access_token);
          window.location.href = "/main";
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
  return (
    <div className="container">
      <h1 className="container__header">Welcome Back!</h1>
      <p className="container__subheader">Please Login.</p>
      <div className="container__content">
        <label className="container__content-label">Email:</label>
        <input
          className="container__content-input medium-mb"
          type="email"
          placeholder="Your Email"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label className="container__content-label">Password:</label>
        <input
          className="container__content-input small-mb"
          type="password"
          placeholder="Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="container__content-register small-mb">
          New here?
          <Link to="/register">&nbsp;Register Now!</Link>
        </p>
        <button
          className="container__content-button"
          onClick={() => {
            login();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default LogIn;
