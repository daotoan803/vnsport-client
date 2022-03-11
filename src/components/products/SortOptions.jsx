import React from 'react';

import { sortOptions } from '../../enums/product.enum';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortOptions = ({ value, onChange }) => {
  const options = [
    { label: 'Tên', value: sortOptions.name },
    { label: 'Bán chạy', value: sortOptions.mostSold },
    { label: 'Xem nhiều', value: sortOptions.mostVisited },
    { label: 'Giá tăng dần', value: sortOptions.priceAsc },
    { label: 'Giá giảm dần', value: sortOptions.priceDesc },
  ];

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
      <Select
        sx={{ minWidth: '12rem' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Sắp xếp theo"
        onChange={onChange}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortOptions;
