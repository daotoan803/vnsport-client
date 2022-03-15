import addressApi from '../apis/address.api';
import { useQuery } from 'react-query';

export default () => {
  const { status, data } = useQuery('province', () => addressApi.getProvince());

  const provinces = data?.data || [];
  return { status, provinces };
};
