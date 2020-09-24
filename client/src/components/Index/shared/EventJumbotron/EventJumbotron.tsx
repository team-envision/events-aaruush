import React from "react";
import { Link } from "react-router-dom";
import { FaMagic as Magic, FaInfoCircle as Circle } from "react-icons/fa";

import { EventProps } from "../EventRow";

const EventJumbotron = (props: EventProps) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-3/5 my-auto">
        <figure>
          <img src={props.thumbnail_url} alt="Kitten" width="100%" />
        </figure>
      </div>
      <div className="flex flex-wrap w-full lg:w-2/5 my-auto lg:px-10 text-center">
        <div className="w-full mt-5 lg:mt-auto">
          <h4>{props.title}</h4>
          <p>{props.description}</p>
        </div>
        <div className="flex flex-wrap w-full mt-6">
          <button className="w-full md:w-2/5 my-auto ml-auto rounded-lg bg-background text-text py-4 px-6">
            <Link to="/event/register" className="flex flex-wrap m-auto w-full">
              <Magic className="m-auto" />
              <span className="m-auto">Register</span>
            </Link>
          </button>
          <button className="w-full md:w-2/5 my-auto ml-auto rounded-lg bg-background text-text py-4 px-6">
            <Link to="/event/info" className="flex flex-wrap m-auto w-full">
              <Circle className="m-auto" />
              <span className="m-auto">More Info</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventJumbotron;
