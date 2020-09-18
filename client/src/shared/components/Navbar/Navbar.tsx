import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import classNames from "classnames";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="ev-navbar">
      <div>
        <figure>
          <img src={logo} alt="logo" />
        </figure>
        <ul>
          <li className={classNames({ active: true })}>Upcoming</li>
          <li>Recent</li>
          <li>Directory of events</li>
          <li>My events</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
