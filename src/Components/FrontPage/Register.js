import React, { useState } from "react";
import "./Register.css";

function Register() {

const [username, setUsername] = useState(undefined);
const [password, setPassword] = useState(undefined);
const [confirmPassword,setConfirmPassword] = useState(undefined)

const register = ()=>{
  if(password == confirmPassword && username !== undefined && confirmPassword !== undefined){
fetch("http://localhost:5000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: username, password: password }),
})
  .then((response) => response.json())
  .then((data) => {
    
    window.location.href = "/";
    console.log(data);
  })
  .catch((e) => {
    console.log(e);
  });
  }
}
  return (
    <div className="container">
      <h1>Welcome to Storyo!</h1>
      <p className="container__subheader">Register and make your own story.</p>
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
          className="container__content-input medium-mb"
          type="password"
          placeholder="Your Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label className="container__content-label">Confirm Password:</label>
        <input
          className="container__content-input medium-mb"
          type="password"
          placeholder="Confirm Password"
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
        />
        <button className="container__content-button" onClick={()=>{register()}}>Register</button>
      </div>
    </div>
  );
}

export default Register;
