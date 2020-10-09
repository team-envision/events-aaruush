import React, { useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";

import "./EventShot.scss";
import { Item, createDate, createTime } from "../EventRow";
import { ModalContext } from "../../../../context/Modal";

const EventShot = (props: Item) => {
  const modalContext = useContext(ModalContext);

  const eventClickhandler = () => {
    modalContext.setModalImg(props.poster);
    modalContext.setModalTitle(props.name);
    modalContext.setModalDate([createTime(props.date), createDate(props.date)]);
    modalContext.setModalLink(props.link);
    modalContext.setModalDesc(props.description);
    modalContext.setIsOpen(!modalContext.isOpen);
    modalContext.setIsActive(props.isActive);
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
            {props.isActive && (
              <a
                href={props.link}
                className="flex w-1/2 h-12 rounded-lg m-auto bg-baseWhite text-baseBlack"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="m-auto focus:outline-none">
                  <AiOutlineForm className="m-auto text-2xl" />
                </button>
              </a>
            )}
            <button
              className="flex w-5/12 h-10 rounded-lg my-auto mr-auto bg-baseBlack text-baseWhite focus:outline-none"
              onClick={eventClickhandler}
            >
              <FaInfoCircle className="m-auto text-lg" />
            </button>
          </div>
          <h4 className="text-xl font-bold mt-3">{props.name}</h4>
          <p className="hidden lg:block text-base">
            {props.description.length > 100
              ? `${props.description.trim().substring(0, 100)}...`
              : props.description}
          </p>
          <ul className="flex text-sm lg:text-base list-none mt-1 lg:mt-4">
            <li>{createTime(props.date)}</li>
            <li>{createDate(props.date)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventShot;
