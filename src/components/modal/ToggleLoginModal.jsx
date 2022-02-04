import React, { useContext } from 'react';
import ModalContext from './../../contexts/ModalContext';

const ToggleLoginModalWrapper = ({ children, onClick = () => {} }) => {
  const modalContext = useContext(ModalContext);

  return (
    <div
      onClick={(e) => {
        modalContext.toggleLoginModal();
        onClick(e);
      }}>
      {children}
    </div>
  );
};

export default ToggleLoginModalWrapper;
