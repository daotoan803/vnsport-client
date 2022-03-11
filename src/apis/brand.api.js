import axios from './axios';
import handleRequest from './utils/handle-request';

export const getBrands = ({ categoryCode, categoryGroupCode }) =>
  handleRequest(
    axios.get('/api/brands', {
      params: {
        categoryCode,
        ...(categoryCode ? {} : { categoryGroupCode }),
      },
    })
  );

export const addBrand = ({ name }) =>
  handleRequest(axios.post('/api/admin/brands', { name }));

export const editBrand = (brandId, { name }) =>
  handleRequest(axios.put(`/api/admin/brands/${brandId}`, { name }));

export const deleteBrand = (brandId) =>
  handleRequest(axios.delete(`/api/admin/brands/${brandId}`));

export default {
  getBrands,
  addBrand,
  editBrand,
  deleteBrand,
};
