import React, { useContext } from "react";
import { FaMagic, FaInfoCircle } from "react-icons/fa";

import "./EventShot.scss";
import { ModalContext } from "../../../../context/Modal";
import { EventProps } from "../EventRow";

const EventShot = ({ title, thumbnail_url, description, tags }: EventProps) => {
  const modalContext = useContext(ModalContext);

  const eventClickhandler = () => {
    modalContext.setModalImg(thumbnail_url);
    modalContext.setModalTitle(title);
    modalContext.setModalTags(tags);
    modalContext.setModalDesc(title);
    modalContext.setIsOpen(!modalContext.isOpen);
  };

  return (
    <div className="ev-event-shot">
      <figure>
        <img src={thumbnail_url} alt="Kitten" />
      </figure>
      <div>
        <div className="content">
          <div className="flex flex-wrap w-7/12">
            <button
              className="flex w-1/2 h-12 rounded-lg m-auto bg-baseWhite text-baseBlack focus:outline-none"
              onClick={eventClickhandler}
            >
              <FaMagic className="m-auto text-lg" />
            </button>
            <button className="flex w-5/12 h-10 rounded-lg m-auto bg-baseBlack text-baseWhite focus:outline-none">
              <FaInfoCircle className="m-auto text-lg" />
            </button>
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
