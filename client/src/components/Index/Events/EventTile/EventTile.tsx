import React, { useContext } from "react";
import { FaMagic, FaInfoCircle } from "react-icons/fa";

import "./EventTile.scss";
import { ModalContext } from "../../../../context/Modal";
import { EventProps } from "../EventRow";

const EventTile = ({ title, thumbnail_url, description, tags }: EventProps) => {
  const modalContext = useContext(ModalContext);

  const eventClickhandler = () => {
    modalContext.setModalImg(thumbnail_url);
    modalContext.setModalTitle(title);
    modalContext.setModalTags(tags);
    modalContext.setModalDesc(description);
    modalContext.setIsOpen(!modalContext.isOpen);
  };

  return (
    <div className="ev-event-tile relative cursor-pointer">
      <figure>
        <img src={thumbnail_url} alt="Kitten" className="w-full h-auto" />
      </figure>
      <div className="absolute w-full h-full top-0 left-0 opacity-0">
        <div className="content w-11/12 lg:w-4/5 absolute">
          <div className="flex flex-wrap w-3/4 lg:w-7/12">
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
          <h4 className="text-xl font-bold mb-2">{title}</h4>
          <p className="text-base hidden lg:block">
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
