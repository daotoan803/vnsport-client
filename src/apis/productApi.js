import auth from './authApi';
import axios from 'axios';

const product = (() => {
  const availableState = {
    available: 'available',
    outStock: 'outStock',
    hidden: 'hidden',
  };

  const availableSortByOption = {
    title: 'title',
    mostVisited: 'mostVisited',
    mostSold: 'mostSold',
    priceDesc: 'priceDesc',
    priceAsc: 'priceAsc',
  };

  const getProductDetail = async (id) => {
    let res = null;
    try {
      res = await axios.get(`/api/products/${id}`);
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  const getListOfProductPreview = async ({
    categoryGroup = null,
    brand = null,
    minPrice = null,
    maxPrice = null,
    sortBy = null,
    category = null,
    page,
    limit,
  }) => {
    let res = null;
    try {
      res = await axios.get(`/api/products`, {
        params: {
          categoryGroup,
          brand,
          minPrice,
          maxPrice,
          sortBy,
          category,
          page,
          limit,
        },
      });
    } catch (e) {
      res = e.response;
    }
    return { status: res.status, data: res.data };
  };

  const uploadImages = (productId, images) => {
    const formData = new FormData();
    formData.append('productId', productId);
    images.forEach((image) => {
      formData.append('images', image);
    });

    return axios.post(
      '/api/admin/product/images',
      formData,
      auth.getAxiosAuthorizationConfig
    );
  };

  const addProduct = async ({
    title,
    detail,
    price,
    discountPrice,
    warrantyPeriodByDay,
    availableQuantity,
    state,
    brandId,
    categoryId,
    images,
  }) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('price', price);
    formData.append('discountPrice', discountPrice);
    formData.append('warrantyPeriodByDay', warrantyPeriodByDay);
    formData.append('availableQuantity', availableQuantity);
    formData.append('state', state);
    formData.append('brandId', brandId);
    formData.append('categoryId', categoryId);
    images.forEach((image) => formData.append('images', image));

    let res = null;
    try {
      const {
        headers: { Authorization },
      } = auth.getAxiosAuthorizationConfig();
      res = await axios.post('/api/admin/products', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization,
        },
      });
    } catch (e) {
      if (!e.response) throw e;
      res = e.response;
    }

    return res;
  };

  const checkProductTitleIsValid = async (title) => {
    let res = null;
    try {
      res = await axios.post(
        '/api/admin/products/is-title-unique',
        { title },
        { ...auth.getAxiosAuthorizationConfig() }
      );
    } catch (e) {
      if (!e.response) throw e;
      res = e.response;
    }

    return res;
  };

  return {
    getListOfProductPreview,
    addProduct,
    uploadImages,
    availableState,
    getProductDetail,
    availableSortByOption,
    checkProductTitleIsValid,
  };
})();

export default product;
