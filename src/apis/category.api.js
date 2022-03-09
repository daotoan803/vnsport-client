import axios from 'axios';
import handleRequest from './utils/handle-request';

export const getCategoryGroups = () =>
  handleRequest(axios.get('/api/categories/group'));

export const getCategories = ({ brandId, categoryGroupCode }) =>
  handleRequest(
    axios.get('/api/categories', {
      params: {
        brandId,
        categoryGroupCode,
      },
    })
  );

export const addCategory = ({ name }) =>
  handleRequest(axios.post('/api/admin/categories', { name }));

export const updateCategory = (categoryId, { name }) =>
  handleRequest(axios.put(`/api/admin/categories/${categoryId}`, { name }));

export const deleteCategory = (categoryId) =>
  handleRequest(axios.delete(`/api/admin/categories/${categoryId}`));

export default {
  getCategories,
  getCategoryGroups,
  addCategory,
  updateCategory,
  deleteCategory,
};
