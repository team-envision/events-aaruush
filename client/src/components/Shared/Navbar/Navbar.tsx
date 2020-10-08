import React from "react";

import "./Navbar.scss";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="fixed ev-navbar z-50">
      <div>
        <figure>
          <img src={logo} alt="logo" />
        </figure>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
