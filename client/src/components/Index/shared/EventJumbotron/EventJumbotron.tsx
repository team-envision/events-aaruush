import React from "react";
import "./EventJumbotron.scss";
import { EventProps } from "../EventRow";
import Button from "../../../Shared/Button/Button";
import { FaMagic, FaInfoCircle } from "react-icons/fa";
import { ButtonTheme } from "../../../Shared/Button/Button";

const EventJumbotron = (props: EventProps) => {
  return (
    <div className="ev-event-jumbotron">
      <div className="banner">
        <figure>
          <img src={props.thumbnail_url} alt="Kitten" />
        </figure>
      </div>
      <div className="flex">
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <div>
          <Button
            icon={FaMagic}
            route="/event/register"
            label="Register"
            theme={ButtonTheme.primary}
          />
          <Button
            icon={FaInfoCircle}
            route="/event/info"
            label={"More info"}
            theme={ButtonTheme.secondary}
          />
        </div>
      </div>
    </div>
  );
};

export default EventJumbotron;
