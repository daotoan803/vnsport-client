import React from 'react';

import {
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';

const FilterRadioGroup = ({ label, value, onChange, options }) => {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <Divider />
      <RadioGroup
        name="radio-buttons-group"
        value={value}
        onChange={onChange}
        defaultValue={-1}>
        <Grid container>
          <Grid item xs={6} md={'auto'}>
            <FormControlLabel value={-1} control={<Radio />} label="Tất cả" />
          </Grid>
          {options.map((option) => (
            <Grid item xs={6} md={'auto'} key={option.value}>
              <FormControlLabel
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default FilterRadioGroup;
