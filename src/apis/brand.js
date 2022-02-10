import axios from 'axios';

const brandApi = (() => {
  const getBrandOptions = async () => {
    let res = null;
    try {
      res = await axios.get('/api/brands');
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  const getListOfBrandByCategoryGroup = async (categoryGroupCode) => {
    let res = null;
    try {
      res = await axios.get('/api/brands/category-group/' + categoryGroupCode);
    } catch (e) {
      res = e.response;
    }

    return { status: res.status, data: res.data };
  };

  return { getBrandOptions, getListOfBrandByCategoryGroup };
})();

export default brandApi;
