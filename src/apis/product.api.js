import axios from 'axios';
import handleRequest from './utils/handle-request';

export const checkProductTitleExists = (title) =>
  handleRequest(axios.post('/api/admin/products/check-title', { title }));

export const getProducts = ({
  page,
  limit,
  sortBy,
  brandId,
  categoryCode,
  categoryGroupCode,
}) =>
  handleRequest(
    axios.get('/api/products', {
      params: {
        page,
        limit,
        sortBy,
        brandId,
        categoryCode,
        categoryGroupCode,
      },
    })
  );

export const getProduct = (productId) =>
  handleRequest(axios.get(`/api/products/${productId}`));

export const addProduct = ({
  title,
  detail,
  price,
  discountPrice,
  warrantyPeriodByDay,
  availableQuantity,
  state,
  brandId,
  categoryId,
  mainImage,
  images,
}) => {
  const data = new FormData();
  data.append('title', title);
  data.append('detail', detail);
  data.append('price', price);
  data.append('discountPrice', discountPrice);
  data.append('warrantyPeriodByDay', warrantyPeriodByDay);
  data.append('availableQuantity', availableQuantity);
  data.append('state', state);
  data.append('brandId', brandId);
  data.append('categoryId', categoryId);
  data.append('mainImage', mainImage);
  if (images?.length > 0) {
    images.forEach((image) => data.append('images', image));
  }

  return handleRequest(axios.post('/api/admin/products', data));
};

export const editProduct = (
  productId,
  {
    title,
    detail,
    price,
    discountPrice,
    warrantyPeriodByDay,
    availableQuantity,
    state,
    brandId,
    categoryId,
    removeImageIds,
    images,
    mainImage,
  }
) => {
  const data = new FormData();
  data.append('title', title);
  data.append('detail', detail);
  data.append('price', price);
  data.append('discountPrice', discountPrice);
  data.append('warrantyPeriodByDay', warrantyPeriodByDay);
  data.append('availableQuantity', availableQuantity);
  data.append('state', state);
  data.append('brandId', brandId);
  data.append('categoryId', categoryId);
  data.append('mainImage', mainImage);
  if (images?.length > 0) {
    images.forEach((image) => data.append('images', image));
  }
  if (removeImageIds?.length > 0) {
    removeImageIds.forEach((id) => data.append('removeImageIds', id));
  }

  return handleRequest(axios.put(`/api/admin/products/${productId}`, data));
};

export default {
  addProduct,
  checkProductTitleExists,
  editProduct,
  getProduct,
  getProducts,
};
