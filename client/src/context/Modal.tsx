import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import Carousel from "../components/Shared/Carousel";

export const ModalContext = React.createContext({
  isOpen: false,
  setIsActive: (_isActive: boolean) => {},
  setIsOpen: (_isOpen: boolean) => {},
  setModalImg: (_modalImg: string[]) => {},
  setModalTitle: (_modalTitle: string) => {},
  setModalDate: (_modalDate: string[]) => {},
  setModalLink: (_modalTags: string) => {},
  setModalDesc: (_modalDesc: string) => {},
});

const ModalContextProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string[]>();
  const [modalTitle, setModalTitle] = useState<string>();
  const [modalDate, setModalDate] = useState<string[]>([]);
  const [modalLink, setModalLink] = useState<string>();
  const [modalDesc, setModalDesc] = useState<string>();

  const Backdrop = () => {
    return (
      <div
        className="fixed bg-black lg:bg-opacity-75 w-screen h-screen top-0 z-40"
        onClick={() => setIsOpen(!isOpen)}
      />
    );
  };

  const Modal = () => {
    return (
      <>
        <Backdrop />
        <div className="fixed bg-transparent flex flex-wrap m-auto overflow-y-scroll max-h-screen w-10/12 top-0 lg:top-10 bottom-0 right-0 left-0 z-50">
          <div className="lg:relative m-auto pb-20">
            <AiFillCloseCircle
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer ml-auto lg:absolute text-5xl lg:mr-4 mt-4 top-0 right-0 text-baseBlack bg-baseWhite rounded-full z-50"
            />
            <Carousel images={modalImg} />
            <div className="flex flex-wrap mt-5">
              <div className="flex my-auto mr-auto text-3xl text-center">
                {modalTitle}
              </div>
              <div className="flex flex-wrap w-full md:w-auto my-3 ml-auto">
                {modalDate.map((tag: string) => (
                  <div
                    key={tag}
                    className="mx-auto md:mr-4 px-5 py-2 bg-baseWhite rounded-lg text-baseBlack font-bold"
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-wrap mt-5">
                <div className="w-full lg:w-7/12 my-auto mr-auto">
                  {modalDesc}
                </div>
                <div className="w-full lg:w-auto my-auto ml-auto text-center">
                  {isActive ? (
                    <a href={modalLink}>
                      <button className="px-6 py-4 lg:mr-10 mt-4 lg:mt-0 rounded-lg focus:outline-none text-xl font-bold bg-green-600">
                        "Register Now !"
                      </button>
                    </a>
                  ) : (
                    <button
                      disabled
                      className="px-6 py-4 lg:mr-10 mt-4 lg:mt-0 rounded-lg focus:outline-none text-xl font-bold bg-red-600 cursor-not-allowed"
                    >
                      Registerations Closed.
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsActive,
        setIsOpen,
        setModalTitle,
        setModalImg,
        setModalDate,
        setModalLink,
        setModalDesc,
      }}
    >
      {props.children}
      {isOpen && <Modal />}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
