import React, { useState, useRef } from 'react';

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
import useProducts from '../../../hooks/useProducts';
import CenteredSpinner from './../../../components/suspend_fallback/CenteredSpinner';

const ManageProductPanel = () => {
  const [page, setPage] = useState(1);
  const LIMIT = 20;

  const topContainerRef = useRef(null);

  const { status, products, maxPage, totalProducts } = useProducts(
    page,
    LIMIT,
    { page }
  );

  return (
    <>
      <Container component={Paper} elevation={3} ref={topContainerRef}>
        {status === 'loading' && <CenteredSpinner />}
        {status === 'success' && (
          <>
            <Typography variant="h6">
              Tổng số lượng mặt hàng: {totalProducts}
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
                  topContainerRef.current.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setPage(value);
                }}
              />
            </Box>
          </>
        )}
        {status === "error" && <Typography variant='h2'>Không thể lấy sản phẩm</Typography>}
      </Container>
    </>
  );
};

export default ManageProductPanel;
