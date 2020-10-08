import React from "react";

import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  return (
    <div className="fixed p-4 z-40">
      <div className="flex items-center">
        <figure>
          <img src={logo} alt="logo" className="h-auto w-56" />
        </figure>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
