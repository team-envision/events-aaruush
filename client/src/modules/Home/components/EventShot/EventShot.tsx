import React, { useState, useEffect } from "react";
import "./EventShot.scss";
import { EventProps } from "../EventRow/EventRow";
import { Button } from "../../../../shared/components";
import { FaMagic, FaInfoCircle } from "react-icons/fa";
import { ButtonTheme } from "../../../../shared/components/Button/Button";

const EventShot = ({ title, thumbnail_url, description, tags }: EventProps) => {
  return (
    <div className="ev-event-shot">
      <figure>
        <img src={thumbnail_url} alt="Kitten" />
      </figure>
      <div>
        <div className="content">
          <div>
            <Button
              icon={FaMagic}
              route="/event/register"
              theme={ButtonTheme.primary}
            />
            <Button
              icon={FaInfoCircle}
              route="/event/info"
              theme={ButtonTheme.secondary}
            />
          </div>
          <h4>{title}</h4>
          <p>{description}</p>
          {tags && (
            <ul>
              {tags?.map((tag) => {
                return <li key={tag}>{tag}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventShot;
