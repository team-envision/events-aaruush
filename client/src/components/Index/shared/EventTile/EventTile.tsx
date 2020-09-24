import React from "react";
import "./EventTile.scss";
import { EventProps } from "../EventRow";

const EventTile = ({ title, thumbnail_url, description, tags }: EventProps) => {
  return (
    <div className="ev-event-tile">
      <figure>
        <img src={thumbnail_url} alt="Kitten" />
      </figure>
      <div>
        <div className="content">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
