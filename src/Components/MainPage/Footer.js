import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer__container">
      <div>
        <p className="footer__container-logo">Storyo</p>
        <p className="footer__container-copy">
          &copy;Copyright 2019 : Storyo.net
        </p>
      </div>
      <div className="footer__container-info">
        <p className="footer__title">About</p>
        <ul>
          <li>Team</li>
          <li>Updates</li>
          <li>Activity</li>
        </ul>
      </div>
      <div className="footer__container-info">
        <p className="footer__title">Contact</p>
        <ul>
          <li>Mail</li>
          <li>Facebook</li>
          <li>Twitter</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
