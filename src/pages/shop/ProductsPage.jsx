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

import productApi from '../../apis/product';
import brandApi from '../../apis/brand';
import ProductList from '../../components/products/ProductList';
import categoryApi from '../../apis/category';
import FilterRadioGroup from './../../components/filter/FilterRadioGroup';

const sortByOptions = [
  { value: productApi.availableSortByOption.title, label: 'Tên sản phẩm' },
  { value: productApi.availableSortByOption.mostVisited, label: 'Xem nhiều' },
  { value: productApi.availableSortByOption.mostSold, label: 'Đã bán' },
  { value: productApi.availableSortByOption.priceDesc, label: 'Giá giảm dần' },
  { value: productApi.availableSortByOption.priceAsc, label: 'Giá tăng dần' },
];

const ProductPage = () => {
  const LIMIT = 20;

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterIsExpand, setFilterIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);

  const { categoryGroupCode } = useParams();
  const [queries, setQueries] = useSearchParams();

  const topRef = useRef(null);

  const filter = {
    ...(queries.has('page') ? { page: queries.get('page') } : { page: 1 }),
    ...(queries.has('category') ? { category: queries.get('category') } : {}),
    ...(queries.has('sortBy')
      ? { sortBy: queries.get('sortBy') }
      : { sortBy: productApi.availableSortByOption.title }),
    ...(queries.has('brand') ? { brand: queries.get('brand') } : {}),
    ...(queries.has('minPrice') ? { minPrice: queries.get('minPrice') } : {}),
    ...(queries.has('maxPrice') ? { maxPrice: queries.get('maxPrice') } : {}),
  };

  useEffect(() => {
    (async function fetchFilterOption() {
      const [{ data: brands }, { data: categories }] = await Promise.all([
        brandApi.getBrands({ categoryGroupCodeOrId: categoryGroupCode }),
        categoryApi.getCategories(categoryGroupCode),
      ]);

      setBrands(
        brands.map((brand) => ({
          value: brand.id,
          label: brand.name,
        }))
      );
      setCategories(
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      );
    })();
  }, [categoryGroupCode]);

  useEffect(() => {
    setLoading(true);
    (async function fetchProducts() {
      const { data } = await productApi.getListOfProductPreview({
        ...filter,
        categoryGroup: categoryGroupCode,
        limit: LIMIT,
        page: filter.page,
      });

      setProducts(data.products);
      setMaxPage(data.maxPage);
      setLoading(false);
    })();
  }, [queries, categoryGroupCode]);

  const toggleFilterExpand = () => {
    setFilterIsExpanded(!filterIsExpand);
  };

  const theme = useTheme();
  const breakPointIsLg = useMediaQuery(theme.breakpoints.up('md'));

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
            options={brands}
            value={filter.brand || -1}
            onChange={(e) => {
              if (+e.target.value === -1) {
                return setQueries((prev) => {
                  delete prev.brand;
                  return { ...prev };
                });
              }
              setQueries({ ...filter, brand: e.target.value });
            }}
          />
          <FilterRadioGroup
            label="Danh mục"
            options={categories}
            value={filter.category || -1}
            onChange={(e) => {
              if (+e.target.value === -1) {
                return setQueries((prev) => {
                  delete prev.category;
                  return { ...prev };
                });
              }
              setQueries({ ...filter, category: e.target.value });
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
              value={filter.sortBy}
              label="Sắp xếp theo"
              onChange={(e) => {
                setQueries({ ...filter, sortBy: e.target.value });
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
          <Pagination
            count={maxPage}
            page={queries.has('page') ? +filter.page : 1}
            onChange={(e, value) => {
              topRef.current.scrollIntoView({ behavior: 'smooth' });
              setQueries({ ...filter, page: value });
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
