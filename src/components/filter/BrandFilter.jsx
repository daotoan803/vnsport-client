import React from 'react';
import useBrands from '../../hooks/useBrands';
import FilterRadioGroup from './FilterRadioGroup';

const BrandFilter = ({ categoryCode, categoryGroupCode, value, onChange }) => {
  const { brands } = useBrands({ categoryCode, categoryGroupCode });

  return (
    <FilterRadioGroup
      label="Thương hiệu"
      options={brands.map((brand) => ({
        value: brand.id,
        label: brand.name,
        count: brand.categoryBrand?.productsCount,
      }))}
      value={value || -1}
      onChange={onChange}
    />
  );
};

export default BrandFilter;
