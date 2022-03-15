import addressApi from '../apis/address.api';
import { useQuery } from 'react-query';

export default ( districtCode ) => {
  const { status, data } = useQuery(['sub-district', districtCode], () =>
    addressApi.getSubDistrictByDistrictCode(districtCode)
  );

  const subDistricts = data?.data || [];
  return { status, subDistricts };
};
