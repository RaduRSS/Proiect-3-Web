import React, { useState } from "react";
import Navbar from "../MainPage/Navbar";
import "./Profile.css";

function Profile() {
  const [newemail, setNewEmail] = useState();
  const [newpassword, setNewPassword] = useState();

  const changeEmail = () => {
    if (newemail !== undefined) {
      const token = localStorage.getItem("access_token");
      fetch("http://localhost:5000/update_email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newemail }),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          window.location.href = "/main";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const changePassword = () => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:5000/update_password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: newpassword }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        window.location.href = "/main";
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Navbar />
      <div className="profile__container">
        <div className="profile__inputs-container">
          <label>Change Email:</label>
          <div className="button_placeholder">
            <input
              type="text"
              placeholder="The new email"
              onChange={(e) => {
                setNewEmail(e.target.value);
              }}
            />
            <button
              className="profile__button"
              onClick={() => {
                changeEmail();
              }}
            >
              Change Email
            </button>
          </div>

          <label>Change Password:</label>
          <div className="button_placeholder">
            {" "}
            <input
              type="text"
              placeholder="The new password"
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <button
              className="profile__button"
              onClick={() => {
                changePassword();
              }}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
