import axios from './axios';
import handleRequest from './utils/handle-request';

export const getUserOrder = () => handleRequest(axios.get('/api/user/order'));

export const createOrder = ({ address, phoneNumber, note, products }) =>
  handleRequest(
    axios.post('/api/user/order', {
      address,
      phoneNumber,
      note,
      products,
    })
  );

export const updateOrderContactDetail = (orderId, { address, phoneNumber }) =>
  handleRequest(
    axios.put(`/api/user/order/${orderId}/contact`, { address, phoneNumber })
  );

export const cancelOrder = (orderId, { reason }) =>
  handleRequest(axios.put(`/api/user/order/${orderId}/cancel`, { reason }));

export default {
  getUserOrder,createOrder, updateOrderContactDetail, cancelOrder
}
