import React from "react";
import { Link } from "react-router-dom";

import aaruush from "../../assets/Shared/aaruushLogoFull.png";
import envision from "../../assets/Shared/envisionLogo.png";

const Hero = () => {
  return (
    <div className="flex flex-wrap bg-black text-white w-screen h-screen text-center">
      <div className="m-auto">
        <h1 className="text-7xl lg:text-9xl font-bold">Oops!</h1>
        <h4 className="text-xl lg:text-3xl my-10 font-semibold">
          E
          <span className="border-solid border-b-2 border-white pb-4">
            RROR 40
          </span>
          4
        </h4>
        <div className="text-base lg:text-xl">
          <p>The page you are looking for does not exist.</p>
          <p>Maybe you mistyped the address or the page was moved.</p>
          <p>
            But you might wanna give{" "}
            <Link to="/" className="underline font-bold">
              this
            </Link>{" "}
            a try !
          </p>
        </div>
        <div className="w-1/2 lg:w-1/5 mx-auto mt-10">
          <img src={aaruush} alt="aaruush" />
        </div>
      </div>
      <div className="w-full mt-auto mb-10">
        <div className="w-1/2 lg:w-1/6 mx-auto mt-10">
          <img src={envision} alt="envision" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
