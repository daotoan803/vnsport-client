import { useQuery } from 'react-query';
import { getBrands } from './../apis/brand.api';

export default ({ categoryCode = null, categoryGroupCode = null } = {}) => {
  const { status, data } = useQuery(
    ['brands', categoryCode, categoryGroupCode],
    ({ queryKey: [, categoryCode, categoryGroupCode] }) => {
      return getBrands({ categoryCode, categoryGroupCode });
    }
  );

  const brands = data?.data || [];
  return { status, brands };
};
