import React, { useContext } from 'react';
import ModalContext from './../../contexts/ModalContext';

const OpenableImage = (props) => {
  const modalContext = useContext(ModalContext);

  const src = props.src;
  return (
    <img
      src={src}
      {...props}
      onClick={() => {
        modalContext.showImageModal(src);
      }}
    />
  );
};

export default OpenableImage;
