import React, { useState, useRef } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const ChatInputBox = ({ onSendClick }) => {
  const [message, setMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const imageInputRef = useRef(null);

  const selectImage = () => {
    imageInputRef.current.click();
  };

  const onImageSelected = (e) => {
    const images = e.target.files;
    const uploadImages = {};

    [...images].forEach((image) => {
      if (uploadImages[image.name]) return;

      uploadImages[image.name] = {
        url: URL.createObjectURL(image),
        file: image,
        name: image.name,
      };
    });

    setSelectedImages(uploadImages);
  };

  const removeImage = (imageName) => {
    const tempImages = { ...selectedImages };
    delete tempImages[imageName];

    setSelectedImages(tempImages);
  };

  return (
    <>
      {Object.values(selectedImages).length > 0 && (
        <Box
          display="flex"
          sx={{ gap: 1, overflowX: 'auto', overflowY: 'hidden' }}>
          {Object.values(selectedImages).map((image) => {
            return (
              <Box
                sx={{ position: 'relative', height: '80px' }}
                key={image.name}>
                <img src={image.url} style={{ height: '100%' }} />
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 1, right: 1 }}
                  color="error"
                  onClick={() => removeImage(image.name)}>
                  <CancelRoundedIcon fontSize="medium" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          py: 1,
          px: 1,
        }}
        gap={2}>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          hidden
          multiple
          onChange={onImageSelected}
        />
        <IconButton size="medium" color="primary" onClick={selectImage}>
          <ImageIcon fontSize="medium" />
        </IconButton>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Tin nhắn"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSendClick(message);
              setMessage('');
            }
          }}
        />
        <IconButton
          size="medium"
          color="primary"
          onClick={() => {
            onSendClick(message);
            setMessage('');
          }}>
          <SendIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
};

export default ChatInputBox;
