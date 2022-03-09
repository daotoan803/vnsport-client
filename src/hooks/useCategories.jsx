import { useQuery } from 'react-query';
import { getCategories } from '../apis/category.api';

export default ({ categoryGroupCode, brandId }) => {
  const { status, data } = useQuery(
    ['categories', categoryGroupCode, brandId],
    ({ queryKey: [, categoryGroupCode, brandId] }) => {
      return getCategories({ brandId, categoryGroupCode });
    }
  );

  let categories = data?.data || [];
  return { status, categories };
};
