import { useQuery, useQueryClient, useMutation } from 'react-query';
import cartApi from '../apis/cart.api';

export default () => {
  const { status, data } = useQuery('cart', () => cartApi.getUserCart());

  const queryClient = useQueryClient();

  const quantityMutation = useMutation(
    ({ productId, quantity }) =>
      cartApi.updateProductQuantityInUserCart(productId, quantity),
    {
      onSuccess() {
        queryClient.invalidateQueries('cart');
      },
    }
  );

  const updateQuantity = (productId, quantity ) => {
    quantityMutation.mutate({ productId, quantity });
  };

  const removeProduct = (productId ) => {
    quantityMutation.mutate({ productId, quantity: 0 });
  };

  const cart = data?.data?.cart || [];

  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      Number(product.quantity) * Number(product.discountPrice || product.price),
    0
  );

  return { status, cart, totalPrice, updateQuantity, removeProduct, isUpdatingQuantity: quantityMutation.isLoading };
};
