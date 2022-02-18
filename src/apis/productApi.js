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
    brand,
    categories,
  }) => {
    const { status, data } = await axios.post(
      '/api/admin/product',
      {
        title,
        detail,
        price,
        discountPrice,
        warrantyPeriodByDay,
        availableQuantity,
        state,
        brandId: brand,
        categories,
      },
      auth.getAxiosAuthorizationConfig
    );

    return { status, data };
  };

  return {
    getListOfProductPreview,
    addProduct,
    uploadImages,
    availableState,
    getProductDetail,
    availableSortByOption,
  };
})();

export default product;
