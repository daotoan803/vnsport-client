import React from 'react';

import {Box, IconButton} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const ImagePreviewContainer = ({images, onRemoveImage}) => {
  return (
    <Box display="flex" sx={{ gap: 1, overflowX: 'auto', overflowY: 'hidden' }}>
      {images.map((image) => {
        return (
          <Box sx={{ position: 'relative', height: '80px' }} key={image.name}>
            <img src={image.url} style={{ height: '100%' }} />
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 1, right: 1 }}
              color="error"
              onClick={() => onRemoveImage(image.name)}>
              <CancelRoundedIcon fontSize="medium" />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default ImagePreviewContainer;
