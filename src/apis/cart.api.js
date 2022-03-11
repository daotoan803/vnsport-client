import axios from './axios';
import handleRequest from './utils/handle-request';

export const getUserCart = () => handleRequest(axios.get('/api/user/cart'));

export const addProductToUserCart = (productId, quantity = 1) =>
  handleRequest(axios.post('/api/user/cart', { productId, quantity }));

export const updateProductQuantityInUserCart = (productId, quantity) =>
  handleRequest(axios.put('/api/user/cart', { productId, quantity }));

export default {
  getUserCart,
  addProductToUserCart,
  updateProductQuantityInUserCart,
};
