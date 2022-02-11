import React from 'react';

import {
  Grid,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Collapse,
  CircularProgress,
  Pagination,
} from '@mui/material';

const ProductFilter = ({
  brandOptions,
  minPrice,
  maxPrice,
  categoryOptions,
  filter,
  onFilterChange,
}) => {
  return (
    <>
      <Grid container gap={2} justifyContent="flex-start">
        <Grid item xs={4}>
          <Button
            variant="outlined"
            onClick={toggleOpenBrandFilterOption}
            size="small">
            Lọc sản phẩm
          </Button>
        </Grid>
      </Grid>
      <Collapse in={openFilter} unmountOnExit>
        <BrandFilter
          options={brandOptions}
          value={filterOption.brand}
          onChange={(e) => {
            changeQuery({ ...filterOption, brand: e.target.value });
            toggleOpenBrandFilterOption();
          }}
        />
      </Collapse>
    </>
  );
};

export default ProductFilter;
