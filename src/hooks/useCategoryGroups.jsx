import { useQuery } from 'react-query';

import categoryApi from '../apis/category.api';

export default () => {
  const {status, data} = useQuery('categoryGroup', categoryApi.getCategoryGroups);

  const categoryGroups = data?.data || []
  return {status, categoryGroups}
};
