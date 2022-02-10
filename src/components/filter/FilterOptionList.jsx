import React from 'react';

import {
  Grid,
  Collapse,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';

const FilterOptionList = ({ value, onChange, options, show = false }) => {
  return (
    <Collapse in={show} unmountOnExit>
      <FormControl>
        <FormLabel>Thương hiệu</FormLabel>

        <Divider />
        <RadioGroup
          name="radio-buttons-group"
          value={value}
          onChange={onChange}>
          <Grid container>
            <Grid item xs={6}>
              <FormControlLabel value={-1} control={<Radio />} label="Tất cả" />
            </Grid>
            {options.map((option) => (
              <Grid item xs={6} key={option.value}>
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
    </Collapse>
  );
};

export default FilterOptionList;
