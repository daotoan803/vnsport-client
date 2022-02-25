import React, { useState, useRef } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import ImagePreviewContainer from './../image/ImagePreviewContainer';

const ChatInputBox = ({ onSendClick }) => {
  const [message, setMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState({});

  const imageInputRef = useRef(null);

  const selectImage = () => {
    imageInputRef.current.click();
  };

  const onImageSelected = (e) => {
    const images = e.target.files;
    const uploadImages = {};

    [...images].forEach((imageFile) => {
      if (uploadImages[imageFile.name]) return;

      uploadImages[imageFile.name] = {
        url: URL.createObjectURL(imageFile),
        file: imageFile,
        name: imageFile.name,
      };
    });

    setSelectedImages(uploadImages);
  };

  const removeImage = (imageName) => {
    const tempImages = { ...selectedImages };
    delete tempImages[imageName];

    setSelectedImages(tempImages);
  };

  const sendMessage = () => {
    if (Object.values(selectedImages).length > 0) {
      const images = Object.values(selectedImages).map((image) => image.file);
      console.log(images);

      onSendClick(message, images);
      setMessage('');
      setSelectedImages({});
      return;
    }
    onSendClick(message);
    setMessage('');
  };

  const onPaste = (e) => {
    console.log(e);

    const files = e.clipboardData?.files;
    console.log('files :: ', files);

    if (files) onImageSelected({ target: { files: files } });
  };

  return (
    <>
      {Object.values(selectedImages).length > 0 && (
        <Box
          display="flex"
          sx={{ gap: 1, overflowX: 'auto', overflowY: 'hidden' }}>
          <ImagePreviewContainer
            images={Object.values(selectedImages)}
            onRemoveImage={removeImage}
          />
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
          onChange={onImageSelected}
        />
        <IconButton size="medium" color="primary" onClick={selectImage}>
          <ImageIcon fontSize="medium" />
        </IconButton>
        <TextField
          sx={{ flexGrow: 1 }}
          label="Tin nhắn"
          value={message}
          multiline
          onChange={(e) => {
            if (e.target.value.length > 254) return;
            setMessage(e.target.value);
          }}
          onPaste={onPaste}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSendClick(message);
              setMessage('');
            }
          }}
        />
        <IconButton size="medium" color="primary" onClick={sendMessage}>
          <SendIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
};

export default ChatInputBox;
