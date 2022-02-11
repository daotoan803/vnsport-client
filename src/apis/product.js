import auth from './auth';
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

  // const getListOfProductPreview = async (page = 1, limit = 20) => {
  //   let res = null;
  //   try {
  //     res = await axios.get(`/api/products?page=${page}&limit=${limit}`);
  //   } catch (e) {
  //     res = e.response;
  //   }

  //   return { status: res.status, data: res.data };
  // };

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
    const brandFilterQuery = Number(brand) !== -1 ? `brand=${brand}` : '';
    const minPriceQuery = minPrice ? `minPrice=${minPrice}` : '';
    const maxPriceQuery = maxPrice ? `maxPrice=${maxPrice}` : '';
    const sortByQuery = availableSortByOption[sortBy]
      ? `sortBy=${availableSortByOption[sortBy]}`
      : '';
    const categoryGroupQuery = categoryGroup
      ? `categoryGroup=${categoryGroup}`
      : '';
    const pageQuery = page ? `page=${page}` : '';
    const limitQuery = limit ? `limit=${limit}` : '';

    let categoryQuery = category ? `category=${category}` : '';
    // if (!Number.isNaN(categoryQuery) && Number(category) < -1) {
    //   categoryQuery = '';
    // }

    let queryOption = [
      pageQuery,
      limitQuery,
      sortByQuery,
      brandFilterQuery,
      minPriceQuery,
      maxPriceQuery,
      categoryQuery,
      categoryGroupQuery,
    ]
      .filter((option) => option !== '')
      .join('&');

    let res = null;
    try {
      const url = `/api/products?${queryOption}`;
      res = await axios.get(url);
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
