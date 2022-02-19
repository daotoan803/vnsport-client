import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchInputBox = ({ value, onChange, onSearchClick, label = '' }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <TextField
        variant="outlined"
        label={label}
        value={value}
        onChange={onChange}
      />
      <IconButton size="large" color="primary" onClick={onSearchClick}>
        <SearchIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default SearchInputBox;
