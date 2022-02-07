import React, { useEffect, useState } from 'react';

import productApi from './../../apis/product';
import { Container, Grid } from '@mui/material';
import ProductList from '../../components/products/ProductList';
import categoryApi from './../../apis/category';
import brandApi from './../../apis/brand';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  useEffect(() => {
    productApi.getProducts().then(({ data }) => {
      setProducts(data);
    });
    categoryApi.getCategoryOptions().then(({ data }) => {
      console.log(data);
      setCategoryOptions(data);
    });
    brandApi.getBrandOptions().then(({ data }) => {
      console.log(data);
      setBrandOptions(data);
    });
  }, []);

  return (
    <Container>
      <Grid container>
        <Grid></Grid>
        <Grid item xs={12}>
          <ProductList products={products} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
