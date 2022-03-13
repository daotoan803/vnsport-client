import React, { useContext } from 'react';

import { Drawer, Typography, Box, Divider, Button } from '@mui/material';
import SideBarContext from '../../../contexts/SideBarContext';
import ProductCartCard from '../../products/ProductCartCard';
import { formatNumberToVnd } from './../../../utils/currency.utils';
import CenteredSpinner from '../../suspend_fallback/CenteredSpinner';
import { useNavigate } from 'react-router-dom';
import useCart from '../../../hooks/useCart';

const CartSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  const navigate = useNavigate();

  const {
    cart,
    status,
    updateQuantity,
    removeProduct,
    isUpdatingQuantity,
    totalPrice,
  } = useCart();

  const onQuantityUpdate = (productId, quantity) => {
    updateQuantity(productId, quantity);
  };

  const onRemoveProductOutOfCart = (productId) => {
    removeProduct(productId);
  };

  const onOrder = () => {
    if (cart.length === 0) return;
    sideBarContext.toggleCart;
    navigate(`/order`);
  };

  return (
    <Drawer
      anchor="right"
      open={sideBarContext.cartIsOpen}
      onClose={sideBarContext.toggleCart}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '30vw',
          height: '100%',
        }}>
        <Typography variant="h4" align="center">
          Giỏ hàng của bạn
        </Typography>
        <Divider />
        {status === 'loading' && <CenteredSpinner />}
        {status === 'success' && (
          <Box
            sx={{
              overflow: 'auto',
              height: '70vh',
              border: '1px solid black',
            }}>
            {cart.length === 0 && (
              <Typography>Chưa có sản phâm nào trong giỏ hàng</Typography>
            )}
            {cart.length > 0 &&
              cart.map((product) => (
                <ProductCartCard
                  key={product.id}
                  product={product}
                  isUpdatingQuantity={isUpdatingQuantity}
                  onUpdateQuantity={onQuantityUpdate}
                  onDelete={onRemoveProductOutOfCart}
                />
              ))}
          </Box>
        )}
        <Box px={2}>
          <Typography variant="h6" align="right">
            Tổng tiền: {formatNumberToVnd(totalPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" my={3}>
          <Button
            variant="contained"
            size="large"
            onClick={onOrder}
            disabled={cart.length === 0}>
            Đặt hàng
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSideBar;
