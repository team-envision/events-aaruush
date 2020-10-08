import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const ModalContext = React.createContext({
  isOpen: false,
  setIsOpen: (_isOpen: boolean) => {},
  setModalImg: (_modalImg: string) => {},
  setModalTitle: (_modalTitle: string) => {},
  setModalTags: (_modalTags: string[] | undefined) => {},
  setModalDesc: (_modalDesc: string) => {},
  submitHandler: () => {},
});

const ModalContextProvider = (props: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<string>();
  const [modalTitle, setModalTitle] = useState<string>();
  const [modalTags, setModalTags] = useState<string[] | undefined>();
  const [modalDesc, setModalDesc] = useState<string>();

  const submitHandler = () => {
    alert("Logged out.");
  };

  const Backdrop = () => {
    return (
      <div
        className="fixed bg-black bg-opacity-75 w-screen h-screen top-0 z-40"
        onClick={() => setIsOpen(!isOpen)}
      />
    );
  };

  const Modal = () => {
    return (
      <>
        <Backdrop />
        <div className="fixed bg-transparent flex flex-wrap m-auto overflow-y-scroll max-h-screen w-10/12 top-10 bottom-0 right-0 left-0 z-50">
          <div className="relative m-auto pb-64">
            <AiFillCloseCircle
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer absolute text-5xl mr-4 mt-4 top-0 right-0 text-baseBlack bg-baseWhite rounded-full"
            />
            <div className="w-full h-90vh text-center">
              <img
                src={modalImg}
                alt={modalTitle}
                className="max-h-full"
                width="100%"
              />
            </div>
            <div className="flex flex-wrap mt-5">
              <div className="mr-auto text-3xl text-center">{modalTitle}</div>
              <div className="ml-auto">
                {modalTags &&
                  modalTags.map((tag: string) => (
                    <span className="mr-8 px-5 py-2 bg-baseWhite rounded-lg bg-opacity-75 text-baseBlack">
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="w-full mt-5">{modalDesc}</div>
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
        setIsOpen,
        submitHandler,
        setModalTitle,
        setModalImg,
        setModalTags,
        setModalDesc,
      }}
    >
      {console.log(isOpen)}
      {props.children}
      {isOpen && <Modal />}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
