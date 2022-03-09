import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  Card,
  Typography,
} from '@mui/material';

import { sortOptions } from '../../enums/product.enum';

import ProductList from '../../components/products/ProductList';
import FilterRadioGroup from './../../components/filter/FilterRadioGroup';
import useProducts from '../../hooks/useProducts';
import useBrands from '../../hooks/useBrands';
import useCategories from '../../hooks/useCategories';

const sortByOptions = [
  { value: sortOptions.name, label: 'Tên sản phẩm' },
  { value: sortOptions.mostVisited, label: 'Xem nhiều' },
  { value: sortOptions.mostSold, label: 'Đã bán' },
  { value: sortOptions.priceDesc, label: 'Giá giảm dần' },
  { value: sortOptions.priceAsc, label: 'Giá tăng dần' },
];

const ProductPage = () => {
  const LIMIT = 20;
  const [filterIsExpand, setFilterIsExpanded] = useState(false);

  const { categoryGroupCode } = useParams();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (!params.has('page')) {
      params.set('page', 1);
      setParams(params);
    }
    if (!params.has('sortBy')) {
      console.log(sortByOptions[0].value);
      params.set('sortBy', sortByOptions[0].value);
      setParams(params);
    }
  }, [params]);

  const page = Number(params.get('page')) || 1;
  const categoryCode = params.get('category');
  const brandId = params.get('brand');
  const sortBy = params.get('sortBy') || '';

  const topRef = useRef(null);

  const {
    status: productStatus,
    products,
    maxPage,
  } = useProducts(page, LIMIT, {
    categoryGroupCode,
    categoryCode,
    brandId,
    sortBy,
  });

  const { brands } = useBrands({ categoryGroupCode, categoryCode });
  const { categories } = useCategories({ categoryGroupCode, brandId });

  const toggleFilterExpand = () => {
    setFilterIsExpanded(!filterIsExpand);
  };

  const theme = useTheme();
  const breakPointIsLg = useMediaQuery(theme.breakpoints.up('md'));

  const onPageChange = (e, value) => {
    topRef.current.scrollIntoView({ behavior: 'smooth' });
    params.set('page', value);
    setParams(params);
  };

  const loading = productStatus === 'loading';
  return (
    <Grid container ref={topRef}>
      <Grid
        item
        xs={12}
        md={3}
        sx={{ pt: breakPointIsLg ? 5 : 0, px: 1 }}
        component={Card}
        variant="outlined">
        {!breakPointIsLg && (
          <Button variant="outlined" onClick={toggleFilterExpand} size="small">
            Lọc sản phẩm
          </Button>
        )}
        <Collapse in={breakPointIsLg ? true : filterIsExpand} unmountOnExit>
          <FilterRadioGroup
            label="Thương hiệu"
            options={brands.map((brand) => ({
              value: brand.id,
              label: brand.name,
            }))}
            value={brandId || -1}
            onChange={(e) => {
              if (+e.target.value === -1) {
                params.delete('brand');
                params.set('page', 1);
                setParams(params);
                return;
              }
              params.set('brand', e.target.value);
              params.set('page', 1);
              setParams(params);
            }}
          />
          <FilterRadioGroup
            label="Danh mục"
            options={categories.map((category) => ({
              value: category.code,
              label: category.name,
            }))}
            value={categoryCode || -1}
            onChange={(e) => {
              if (+e.target.value === -1) {
                params.delete('category');
                params.set('page', 1);
                return setParams(params);
              }
              params.set('category', e.target.value);
              params.set('page', 1);
              setParams(params);
            }}
          />
          <Box sx={{ my: 2 }} display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={toggleFilterExpand}
              size="small">
              Lọc sản phẩm
            </Button>
          </Box>
        </Collapse>
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        <Box variant="outlined" display="flex" justifyContent="flex-end">
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sắp xếp theo</InputLabel>
            <Select
              sx={{ minWidth: '12rem' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sắp xếp theo"
              onChange={(e) => {
                params.set('sortBy', e.target.value);
                params.set('page', 1);
                setParams(params);
              }}>
              {sortByOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider />
        </Box>
        <Box sx={{ flexShrink: 1 }}>
          {loading && (
            <Box display="flex" justifyContent="center" sx={{ mt: '2rem' }}>
              <CircularProgress />
            </Box>
          )}
          {!loading && products.length > 0 && (
            <ProductList products={products} />
          )}
          {!loading && products.length === 0 && (
            <Typography variant="h6" align="center">
              Không tìm thấy sản phẩm
            </Typography>
          )}
        </Box>
        <Box display="flex" justifyContent="center" sx={{ py: 2 }}>
          <Pagination count={maxPage} page={page} onChange={onPageChange} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
