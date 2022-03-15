import addressApi from '../apis/address.api';
import { useQuery } from 'react-query';

export default (provinceCode) => {
  const { status, data } = useQuery(['district', provinceCode], () =>
    addressApi.getDistrictByProvinceCode(provinceCode)
  );

  const districts = data?.data || [];
  return { status, districts };
};
