import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productApi from './../../apis/product';
import { Container, Box } from '@mui/material';

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    productApi.getProductDetail(productId).then(({ data }) => {
      setProduct(data);
    });
  }, []);

  console.log(product);

  return (
    <Container>
      <Box >
        <img />
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
