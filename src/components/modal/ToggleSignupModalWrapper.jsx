import React, { useContext } from 'react';
import ModalContext from './../../contexts/ModalContext';

const ToggleSignupModalWrapper = ({ children, onClick = () => {} }) => {
  const modalContext = useContext(ModalContext);

  return (
    <div
      onClick={(e) => {
        modalContext.toggleSignupModal();
        onClick(e);
      }}>
      {children}
    </div>
  );
};

export default ToggleSignupModalWrapper;
