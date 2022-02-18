import React from 'react';

import { Button } from '@mui/material';
import ToggleLoginModalWrapper from './../modal/ToggleLoginModal';

const ToggleLoginModalButton = ({ onClick }) => {
  return (
    <ToggleLoginModalWrapper>
      <Button onClick={onClick} variant="outlined">
        Đăng nhập
      </Button>
    </ToggleLoginModalWrapper>
  );
};

export default ToggleLoginModalButton;
