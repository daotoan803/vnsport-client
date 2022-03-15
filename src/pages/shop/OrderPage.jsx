import React, { useEffect, useState, useContext } from 'react';

import {
  Grid,
  Box,
  TextField,
  Typography,
  Container,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import useCart from '../../hooks/useCart';
import ProductCartCard from './../../components/products/ProductCartCard';
import CenteredSpinner from './../../components/suspend_fallback/CenteredSpinner';
import { formatNumberToVnd } from './../../utils/currency.utils';
import userApi from '../../apis/user.api';
import useInput from '../../hooks/useInput';
import orderApi from '../../apis/order.api';
import AlertContext from './../../contexts/AlertContext';
import { useNavigate } from 'react-router-dom';

const isAddressValid = (address) =>
  address === '' || address.trim().length >= 10;
const isPhoneNumberValid = (phoneNumber) =>
  phoneNumber === '' ||
  (phoneNumber.trim().length >= 10 && phoneNumber.length <= 20);

const OrderPage = () => {
  const {
    cart,
    isUpdatingQuantity,
    removeProduct,
    status: cartStatus,
    updateQuantity,
    totalPrice,
  } = useCart();

  const [addressErr, address, setAddress] = useInput('', isAddressValid);
  const [phoneNumberErr, phoneNumber, setPhoneNumber] = useInput(
    '',
    isPhoneNumberValid
  );
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    userApi.getCurrentUserDetail().then((res) => {
      console.log(res.data.user);
      const user = res.data.user;
      setAddress(user.address || '');
      setPhoneNumber(user.phoneNumber || '');
      setNote(user.note || '');
    });
  }, []);

  useEffect(() => {
    setError('');
  }, [address, phoneNumber]);

  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const onQuantityUpdate = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const onRemoveProductOutOfCart = (productId) => {
    removeProduct(productId);
  };

  const onOrder = async () => {
    if (address === '' || addressErr || phoneNumber === '' || phoneNumberErr) {
      return setError('Vui lòng điền đẩy đủ thông tin');
    }
    if (loading) return;
    setLoading(true);
    const productsInOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      price: product.discountPrice || product.price,
    }));

    const res = await orderApi.createOrder({
      address,
      phoneNumber,
      note,
      products: productsInOrder,
    });

    if (res.status === 200) {
      alertContext.showSuccessAlert(' 🎉🎉🎉 Đặt hàng thành công 🎉🎉🎉');
      navigate('');
    } else {
      setError(res.data.error);
    }

    setLoading(false);
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
          <Box
            sx={{
              mx: 'auto',
              width: '60%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            <TextField
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helperText="Địa chỉ cần ít nhất 10 ký tự"
              error={addressErr}
              required
              multiline
              fullWidth
            />
            <TextField
              label="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              helperText="Số điện cần hợp lệ"
              error={phoneNumberErr}
              required
              fullWidth
            />
            <TextField
              label="Ghi chú"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              multiline
              fullWidth
            />
            <Box display="flex" alignItems="center" flexDirection="column">
              {error && (
                <Typography variant="h6" color="error">
                  {error}
                </Typography>
              )}
              <LoadingButton
                loading={loading}
                variant="contained"
                onClick={onOrder}>
                Đặt hàng
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default OrderPage;
