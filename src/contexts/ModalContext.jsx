import React, { createContext, useState } from 'react';

const ModalContext = createContext({
  loginModalIsOpen: false,
  signupModalIsOpen: false,
  toggleLoginModal() {},
  toggleSignupModal() {},
});
export default ModalContext;

export const ModalContextProvider = ({ children }) => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalIsOpen(!loginModalIsOpen);
  };

  const toggleSignupModal = () => {
    setSignupModalIsOpen(!signupModalIsOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        loginModalIsOpen,
        signupModalIsOpen,
        toggleLoginModal,
        toggleSignupModal,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
