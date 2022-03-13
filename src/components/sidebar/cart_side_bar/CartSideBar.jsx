import React, { useContext } from 'react';

import { Drawer, Typography, Box, Divider, Button } from '@mui/material';
import SideBarContext from '../../../contexts/SideBarContext';
import CartContext from './../../../contexts/CartContext';
import ProductCartCard from '../../products/ProductCartCard';
import { formatNumberToVnd } from './../../../utils/currency.utils';
const CartSideBar = () => {
  const sideBarContext = useContext(SideBarContext);
  const cartContext = useContext(CartContext);

  const onQuantityUpdate = (productId, quantity) => {
    return cartContext.updateQuantity(productId, quantity);
  };

  const onRemoveProductOutOfCart = (productId) => {
    return cartContext.removeProduct(productId);
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
        <Box
          sx={{
            overflow: 'auto',
            height: '70vh',
            border: '1px solid black',
          }}>
          {cartContext.cart.length === 0 && (
            <Typography>Chưa có sản phâm nào trong giỏ hàng</Typography>
          )}
          {cartContext.cart.length > 0 &&
            cartContext.cart.map((product) => (
              <ProductCartCard
                key={product.id}
                product={product}
                onUpdateQuantity={onQuantityUpdate}
                onDelete={onRemoveProductOutOfCart}
              />
            ))}
        </Box>
        <Box px={2}>
          <Typography variant="h6" align="right">
            Tổng tiền: {formatNumberToVnd(cartContext.totalPrice)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" my={3}>
          <Button variant="contained" size="large">
            Đặt hàng
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartSideBar;
