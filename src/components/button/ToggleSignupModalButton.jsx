import React from 'react';
import ToggleSignupModalWrapper from './../modal/ToggleSignupModalWrapper';
import { Button } from '@mui/material';

const ToggleSignupModalButton = ({ onClick }) => {
  return (
    <ToggleSignupModalWrapper>
      <Button onClick={onClick} variant="contained">
        Đăng ký
      </Button>
    </ToggleSignupModalWrapper>
  );
};

export default ToggleSignupModalButton;
