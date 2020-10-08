import React from "react";
import "./EventTile.scss";
import { EventProps } from "../EventRow";

//Indivisual tile
const EventTile = ({ title, thumbnail_url, description }: EventProps) => {
  return (
    <div className="ev-event-tile">
      <figure>
        <img src={thumbnail_url} alt="Kitten" />
      </figure>
      <div>
        <div className="content">
          <h4 className="text-xl font-bold">{title}</h4>
          <p className="text-base">
            {description.length > 150
              ? `${description.trim().substring(0, 150)}...`
              : description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventTile;
