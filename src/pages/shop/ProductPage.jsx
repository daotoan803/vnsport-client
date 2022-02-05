import React, { useEffect, useState } from 'react';

import ProductCard from './../../components/products/ProductCard';
import productApi from './../../apis/product';
import { Container, Grid } from '@mui/material';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productApi.getProducts().then(({ data }) => {
      setProducts(data);
    });
  }, []);

  return (
    <Container>
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
      </Grid>
    </Container>
  );
};

export default ProductPage;
