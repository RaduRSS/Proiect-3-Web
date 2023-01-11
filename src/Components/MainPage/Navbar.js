import React from "react";
import "./Navbar.css";
import { FaUserAlt, FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const logout = ()=>{
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:5000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem("access_token")
        window.location.href = "/"
        
      });
  }
  return (
    <div className="navbar__container">
      <Link to="/main" className="navbar__container-logo">Storyo</Link>
      <div className="links__container">
        <Link className="profile__button" to="/profile">
          <FaUserAlt className="profile__button-icon" />
          Profile
        </Link>
        <button className="logout__button" onClick={()=>{logout()}}>
          <FaLockOpen className="logout__button-icon" />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
