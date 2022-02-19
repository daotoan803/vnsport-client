import React from 'react';

import ProductSearchBox from './../input/ProductSearchBox';

import { Box, Typography, Paper } from '@mui/material';

const QuickProductSearchBox = () => {
  return (
    <>
      <Paper component={Box} elevation={2}>
        <ProductSearchBox />
      </Paper>
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {new Array(20).fill(null).map((_, index) => (
          <Typography key={index}>{index} This is shit</Typography>
        ))}
      </Box>
    </>
  );
};

export default QuickProductSearchBox;
