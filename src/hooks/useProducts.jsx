import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getProducts } from '../apis/product.api';

export default (
  page,
  limit,
  { brandId = null, categoryCode = null, categoryGroupCode = null, sortBy } = {}
) => {
  const [maxPage, setMaxPage] = useState(0);

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

  useEffect(() => {
    if (status === 'success') {
      setMaxPage(Math.ceil(data.data.count / limit));
    }
  }, [status]);

  return {
    status,
    products,
    maxPage,
  };
};
