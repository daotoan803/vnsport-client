import React, { useEffect, useState } from 'react';

import {
  Grid,
  Box,
  TextField,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import useCart from '../../hooks/useCart';
import ProductCartCard from './../../components/products/ProductCartCard';
import CenteredSpinner from './../../components/suspend_fallback/CenteredSpinner';
import { formatNumberToVnd } from './../../utils/currency.utils';
import userApi from '../../apis/user.api';
import useInput from '../../hooks/useInput';

const OrderPage = () => {
  const {
    cart,
    isUpdatingQuantity,
    removeProduct,
    status: cartStatus,
    updateQuantity,
    totalPrice,
  } = useCart();

  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [note, setNote] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    userApi.getCurrentUserDetail().then((res) => {
      console.log(res.data.user);
      const user = res.data.user;
      setAddress(user.address || '');
      setPhoneNumber(user.phoneNumber || '');
      setNote(user.note || '');
    });
  }, []);

  const onQuantityUpdate = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const onRemoveProductOutOfCart = (productId) => {
    removeProduct(productId);
  };

  return (
    <Grid container>
      <Grid item container xs={12} component={Box}>
        {cartStatus === 'loading' && <CenteredSpinner />}
        {cartStatus === 'success' &&
          cart.length > 0 &&
          cart.map((product) => (
            <Grid item xs={6} key={product.id}>
              <ProductCartCard
                product={product}
                isUpdatingQuantity={isUpdatingQuantity}
                onUpdateQuantity={onQuantityUpdate}
                onDelete={onRemoveProductOutOfCart}
              />
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="right">
          Total price: {formatNumberToVnd(totalPrice)}
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Đặt hàng
        </Typography>
        <Container component={Box} pt={1} pb={5}>
          <Box sx={{ width: '60%' }}>
            <TextField label="Thành phố" select />
            <TextField
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              multiline
            />
            <TextField
              label="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <TextField
              label="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              multiline
            />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default OrderPage;
