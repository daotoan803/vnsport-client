import axios from 'axios';
import handleRequest from './utils/handle-request';

export const getProvince = () =>
  handleRequest(axios.get('https://provinces.open-api.vn/api/p/'));

export const getDistrictByProvinceCode = (provinceCode) =>
  handleRequest(
    axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
  );

export const getSubDistrictByDistrictCode = (districtCode) => handleRequest(axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`))