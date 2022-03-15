import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectInput = ({
  options,
  value,
  onChange,
  label,
  id = Math.random(),
}) => {
  return (
    <FormControl>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        sx={{ minWidth: '12rem' }}
        labelId={id}
        id={id}
        value={value}
        label={label}
        onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
