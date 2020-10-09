import React, { useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";

import "./EventTile.scss";
import { Item, createDate, createTime } from "../EventRow";
import { ModalContext } from "../../../../context/Modal";

const EventTile = (props: Item) => {
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
    <div className="ev-event-tile relative cursor-pointer">
      <figure>
        <img src={props.poster[0]} alt="Kitten" className="w-full h-auto" />
      </figure>
      <div className="absolute w-full h-full top-0 left-0 opacity-0">
        <div className="content w-11/12 lg:w-4/5 absolute">
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
          <h4 className="text-xl font-bold my-1 lg:mb-2">{props.name}</h4>
          <p className="text-base hidden lg:block">
            {props.description.length > 150
              ? `${props.description.trim().substring(0, 150)}...`
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

export default EventTile;
