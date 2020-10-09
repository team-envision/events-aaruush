import React, { useContext } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";

import "./EventJumbotron.scss";
import { Item, createDate, createTime } from "../EventRow";
import { ModalContext } from "../../../../context/Modal";

const EventJumbotron = (props: Item) => {
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
    <div className="flex flex-wrap">
      <div className="w-full lg:w-3/5 my-auto">
        {props.poster && props.poster.length !== 0 && (
          <figure>
            <img src={props.poster[0]} alt={props.name} width="100%" />
          </figure>
        )}
      </div>
      <div className="content flex flex-wrap w-full lg:w-2/5 my-auto lg:px-10 lg:text-center">
        <div className="w-full mt-5 lg:mt-auto">
          <h4 className="text-xl font-bold">{props.name}</h4>
          <p className="text-base my-2">{props.description}</p>
        </div>
        <div className="flex flex-wrap w-full mt-6">
          {props.isActive && (
            <a
              href={props.link}
              className="flex w-1/2 h-12 rounded-lg m-auto bg-baseWhite text-baseBlack"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="m-auto focus:outline-none">
                <AiOutlineForm className="m-auto text-3xl" />
              </button>
            </a>
          )}
          <button
            className="flex w-5/12 h-10 rounded-lg m-auto bg-baseBlack text-baseWhite focus:outline-none shadow-jumbotronInfo"
            onClick={eventClickhandler}
          >
            <FaInfoCircle className="m-auto text-2xl" />
          </button>
        </div>
        <ul className="hidden lg:flex list-none mt-6 w-full text-lg mx-auto text-center">
          <li className="ml-auto">{createTime(props.date)}</li>
          <li className="mr-auto">{createDate(props.date)}</li>
        </ul>
      </div>
    </div>
  );
};

export default EventJumbotron;
