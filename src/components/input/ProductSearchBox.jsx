import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import SearchInputBox from './SearchInputBox';

const ProductSearchBox = ({ onSearchFinish }) => {
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearchFinish([]);
    }, 800);

    return window.clearTimeout(debounce);
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItem="center"
      sx={{ py: 1 }}>
      <SearchInputBox
        label="Tìm kiếm sản phẩm"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Box>
  );
};

export default ProductSearchBox;
