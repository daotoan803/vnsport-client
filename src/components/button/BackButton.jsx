import React from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = (props) => {
  const navigate = useNavigate();

  return (
    <Button
      {...props}
      startIcon={<ArrowBackIcon />}
      variant="contained"
      onClick={() => navigate(-1)}>
      Quay lại
    </Button>
  );
};

export default BackButton;
