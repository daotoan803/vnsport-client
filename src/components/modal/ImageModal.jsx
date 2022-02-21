import React, { useContext } from 'react';

import { Modal } from '@mui/material';
import ModalContext from './../../contexts/ModalContext';

const ImageModal = () => {
  const { imageModalSrc, removeImageModal } = useContext(ModalContext);

  return (
    <Modal
      open={imageModalSrc !== ''}
      onClose={removeImageModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}>
      <img src={imageModalSrc} style={{ height: '90vh', width: 'auto' }} />
    </Modal>
  );
};

export default ImageModal;
