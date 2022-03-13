import { useQuery } from 'react-query';
import { getProducts } from '../apis/product.api';

export default (
  page,
  limit,
  { brandId = null, categoryCode = null, categoryGroupCode = null, sortBy } = {}
) => {
  const { status, data } = useQuery(
    ['products', page, brandId, categoryCode, categoryGroupCode, sortBy],
    ({
      queryKey: [, page, brandId, categoryCode, categoryGroupCode, sortBy],
    }) => {
      return getProducts({
        page,
        limit,
        brandId,
        categoryCode,
        categoryGroupCode,
        sortBy,
      });
    }
  );

  const products = data?.data?.rows || [];

  const totalProducts = data?.data?.count || 0;
  const maxPage = Math.ceil(totalProducts / limit);

  return {
    status,
    products,
    data,
    maxPage,
    totalProducts,
  };
};
