import React, { useContext } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import cartApi from '../../apis/cart.api';
import { Button } from '@mui/material';
import AlertContext from './../../contexts/AlertContext';

const AddToCartButton = ({ productId }) => {
  const queryClient = useQueryClient();
  const alertContext = useContext(AlertContext);
  const cartMutation = useMutation(
    (productId, quantity = 1) =>
      cartApi.addProductToUserCart(productId, quantity),
    {
      onSuccess() {
        alertContext.showSuccessAlert('Đã thêm sản phẩm vào giỏ hàng ✨🎉');
        queryClient.invalidateQueries('cart');
      },
    }
  );

  const addToCart = () => {
    cartMutation.mutate(productId);
  };

  return (
    <Button variant="outlined" onClick={addToCart}>
      Thêm vào giỏ hàng
    </Button>
  );
};

export default AddToCartButton;
