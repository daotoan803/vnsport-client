import React, { useState, useEffect, useRef } from 'react';
import productApi from './../../../apis/productApi';

import {
  Grid,
  Paper,
  Container,
  Box,
  Typography,
  Pagination,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import AdminProductCard from '../../../components/products/AdminProductCard';

const ManageProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const LIMIT = 20;

  const topContainerRef = useRef(null);

  useEffect(() => {
    productApi.getProductsForAdmin({ page, limit: LIMIT }).then((res) => {
      setProducts(res.data.products);
      setMaxPage(res.data.maxPage);
      setTotalProduct(res.data.count);
    });
  }, []);

  useEffect(() => {
    productApi.getProductsForAdmin({ page, limit: LIMIT }).then((res) => {
      setProducts(res.data.products);
    });
  }, [page]);

  return (
    <>
      <Container component={Paper} elevation={3} ref={topContainerRef}>
        <Typography variant="h6">
          Tổng số lượng mặt hàng: {totalProduct}
        </Typography>
        <Grid container>
          {products.map((product) => {
            return <AdminProductCard key={product.id} product={product} />;
          })}
        </Grid>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={maxPage}
            page={page}
            size="large"
            onChange={(e, value) => {
              topContainerRef.current.scrollIntoView({ behavior: 'smooth' });
              setPage(value);
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default ManageProductPanel;
