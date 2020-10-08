import React from "react";

import SpinnerGif from "../../assets/Shared/spinner.gif";

const Spinner = () => {
  return (
    <div className="flex w-screen h-screen bg-spinnerBlack">
      <div className="w-1/2 md:w-1/3 lg:w-1/5 m-auto">
        <img src={SpinnerGif} alt="spinning-a'20" width="100%" />
      </div>
    </div>
  );
};

export default Spinner;
