import React, { createContext, useState } from 'react';

const ModalContext = createContext({
  loginModalIsOpen: false,
  signupModalIsOpen: false,
  imageModalSrc: '',
  toggleLoginModal() {},
  toggleSignupModal() {},
  // eslint-disable-next-line no-unused-vars
  showImageModal(imageSrc) {},
  removeImageModal() {},
});
export default ModalContext;

export const ModalContextProvider = ({ children }) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState('');

  const toggleLoginModal = () => {
    setLoginModalIsOpen(!loginModalIsOpen);
  };

  const toggleSignupModal = () => {
    setSignupModalIsOpen(!signupModalIsOpen);
  };

  const showImageModal = (imageSrc) => {
    setImageModalSrc(imageSrc);
  };

  const removeImageModal = () => {
    setImageModalSrc('');
  };

  return (
    <ModalContext.Provider
      value={{
        loginModalIsOpen,
        signupModalIsOpen,
        imageModalSrc,
        toggleLoginModal,
        toggleSignupModal,
        showImageModal,
        removeImageModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
