import React from 'react';
import useCategories from '../../hooks/useCategories';
import FilterRadioGroup from './FilterRadioGroup';

const CategoryFilter = ({ brandId, categoryGroupCode, value, onChange }) => {
  const { categories } = useCategories({ brandId, categoryGroupCode });

  return (
    <FilterRadioGroup
      label="Danh mục"
      options={categories.map((category) => ({
        value: category.code,
        label: category.name,
        count: category.categoryBrand?.productsCount,
      }))}
      value={value || -1}
      onChange={onChange}
    />
  );
};

export default CategoryFilter;
