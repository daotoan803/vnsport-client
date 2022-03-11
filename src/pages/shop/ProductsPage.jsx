import React, { useState, useRef } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Grid,
  Button,
  Box,
  Divider,
  Collapse,
  CircularProgress,
  Pagination,
  Card,
  Typography,
} from '@mui/material';

import { sortOptions } from '../../enums/product.enum';

import ProductList from '../../components/products/ProductList';
import useProducts from '../../hooks/useProducts';
import BrandFilter from '../../components/filter/BrandFilter';
import CategoryFilter from './../../components/filter/CategoryFilter';
import SortOptions from './../../components/products/SortOptions';

const ProductPage = () => {
  const LIMIT = 20;
  const [filterIsExpand, setFilterIsExpanded] = useState(false);

  const { categoryGroupCode, categoryCode } = useParams();
  const [params, setParams] = useSearchParams();

  const page = Number(params.get('page')) || 1;
  const brandId = params.get('brand');
  const sortBy = params.get('sortBy') || sortOptions.name;

  const navigate = useNavigate();

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
          <BrandFilter
            value={brandId}
            categoryCode={categoryCode}
            categoryGroupCode={categoryGroupCode}
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
          <CategoryFilter
            value={categoryCode}
            brandId={brandId}
            categoryGroupCode={categoryGroupCode}
            onChange={(e) => {
              if (+e.target.value === -1) {
                return navigate(`/products/${categoryGroupCode}`);
              }
              navigate(`/products/${categoryGroupCode}/${e.target.value}`);
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
          <SortOptions
            value={sortBy}
            onChange={(e) => {
              params.set('sortBy', e.target.value);
              params.set('page', 1);
              setParams(params);
            }}
          />
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
