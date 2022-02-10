import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import {
  Grid,
  Button,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
} from '@mui/material';
import productApi from './../../apis/product';
import brandApi from './../../apis/brand';
import ProductList from './../../components/products/ProductList';
import FilterOptionList from '../../components/filter/FilterOptionList';

const sortByOptions = [
  { value: productApi.availableSortByOption.title, label: 'Tên sản phẩm' },
  { value: productApi.availableSortByOption.mostVisited, label: 'Xem nhiều' },
  { value: productApi.availableSortByOption.mostSold, label: 'Đã bán' },
  { value: productApi.availableSortByOption.priceDesc, label: 'Giá giảm dần' },
  { value: productApi.availableSortByOption.priceAsc, label: 'Giá tăng dần' },
];

const GroupCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [openBrandFilterOptions, setOpenBrandFilterOptions] = useState(false);

  const location = useLocation();
  const categoryGroupCode = location.pathname.slice(1);

  const [queries, setQueries] = useSearchParams();

  const filterOption = {
    sortBy: queries.has('sortBy')
      ? queries.get('sortBy')
      : productApi.availableSortByOption.title,
    brand: queries.has('brand') ? queries.get('brand') : -1,
    minPrice: queries.has('minPrice') ? queries.get('minPrice') : -1,
    maxPrice: queries.has('maxPrice') ? queries.get('maxPrice') : -1,
  };

  useEffect(() => {
    productApi
      .findListOfProductPreviewByCategoryGroup(categoryGroupCode, filterOption)
      .then(({ data }) => setProducts(data.products));
    brandApi
      .getListOfBrandByCategoryGroup(categoryGroupCode)
      .then(({ data }) => setBrandOptions(data));
  }, [queries]);

  const toggleOpenBrandFilterOption = () => {
    setOpenBrandFilterOptions(!openBrandFilterOptions);
  };

  const filter = ({ brand, minPrice, maxPrice, sortBy }) => {
    const params = {};
    if (brand > 0) params.brand = brand;
    if (minPrice > 0) params.minPrice = minPrice;
    if (maxPrice > 0) params.maxPrice = maxPrice;
    if (Object.keys(productApi.availableSortByOption).includes(sortBy))
      params.sortBy = productApi.availableSortByOption[sortBy];

    setQueries(params);
  };

  const brand = brandOptions.find(
    (brand) => brand.id === Number(filterOption.brand)
  );

  return (
    <div>
      <Grid container gap={2} justifyContent="flex-start">
        <Grid item xs={4}>
          <Button variant="outlined" onClick={toggleOpenBrandFilterOption}>
            {brand?.name || 'Thương hiệu'}
          </Button>
        </Grid>
      </Grid>
      <FilterOptionList
        show={openBrandFilterOptions}
        options={brandOptions.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))}
        value={filterOption.brand}
        onChange={(e) => {
          filter({ ...filterOption, brand: e.target.value });
          toggleOpenBrandFilterOption();
        }}
      />
      <Divider />
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
          <Select
            sx={{ minWidth: '12rem' }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterOption.sortBy}
            label="Sắp xếp theo"
            onChange={(e) => {
              filter({ ...filterOption, sortBy: e.target.value });
            }}>
            {sortByOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ProductList products={products} />
    </div>
  );
};

export default GroupCategoryPage;
