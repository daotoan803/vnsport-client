import React from 'react';

import ProductCard from './ProductCard';
import { Grid } from '@mui/material';

const ProductList = ({ products }) => {
  return(
  <Grid container alignItems="stretch">
    {products.map((product) => (
      <Grid item key={product.id} xs={6} md={6} lg={3}>
        <ProductCard
          id={product.id}
          title={product.title}
          price={product.price}
          discountPrice={product.discountPrice}
          image={product.mainImageUrl}
          state={product.state}
        />
      </Grid>
    ))}
  </Grid>)
};

export default ProductList;
