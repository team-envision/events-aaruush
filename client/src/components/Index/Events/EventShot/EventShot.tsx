import React, { useContext } from "react";
import { FaMagic, FaInfoCircle } from "react-icons/fa";

import "./EventShot.scss";
import { ModalContext } from "../../../../context/Modal";
import { Item } from "../EventRow";

const EventShot = (props: Item) => {
  const modalContext = useContext(ModalContext);

  const eventClickhandler = () => {
    modalContext.setModalImg(props.poster);
    modalContext.setModalTitle(props.name);
    modalContext.setModalTags(props.tags);
    modalContext.setModalDesc(props.description);
    modalContext.setIsOpen(!modalContext.isOpen);
  };

  return (
    <div className="ev-event-shot relative overflow-hidden cursor-pointer">
      <figure>
        <img
          src={props.poster[0]}
          alt="Kitten"
          className="h-full w-full object-cover object-center"
        />
      </figure>
      <div className="w-full h-full top-0 left-0 opacity-0 absolute">
        <div className="content absolute">
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
          <h4 className="text-xl font-bold mt-3">{props.name}</h4>
          <p className="hidden lg:block text-base">
            {props.description.length > 100
              ? `${props.description.trim().substring(0, 100)}...`
              : props.description}
          </p>
          <ul className="hidden lg:flex list-none mt-4">
            {props.tags?.map((tag: string, index: number) => {
              return <li key={index.toString()}>{tag}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventShot;
