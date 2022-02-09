import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import categoryApi from './../../apis/category';
import {
  Grid,
  TextField,
  Collapse,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@mui/material';
import brandApi from './../../apis/brand';

const GroupCategoryPage = () => {
  const { categoryGroupId } = useParams();
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [filterByBrand, setFilterByBrand] = useState(-1);
  const [openBrandFilterOptions, setOpenBrandFilterOptions] = useState(false);

  useEffect(() => {
    categoryApi
      .getCategoryGroupPreview(categoryGroupId)
      .then(({ data }) => setProducts(data.products));

    brandApi
      .getBrandOptionsByCategoryGroup(categoryGroupId)
      .then(({ data }) => setBrandOptions(data));
  }, [categoryGroupId]);

  const toggleOpenBrandFilterOption = () => {
    setOpenBrandFilterOptions(!openBrandFilterOptions);
  };

  const brand = brandOptions.find(
    (brand) => brand.id === Number(filterByBrand)
  );

  return (
    <div>
      <Grid container gap={2} justifyContent="flex-end">
        <Grid item xs={4}>
          <Button variant="outlined" onClick={toggleOpenBrandFilterOption}>
            {brand?.name || 'Thương hiệu'}
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Sắp xếp" value={filterByBrand} />
        </Grid>
      </Grid>
      <Collapse in={openBrandFilterOptions}>
        <FormControl>
          <FormLabel>Thương hiệu</FormLabel>

          <Divider />
          <RadioGroup
            name="radio-buttons-group"
            value={filterByBrand}
            onChange={(e) => {
              setFilterByBrand(e.target.value);
              toggleOpenBrandFilterOption();
            }}>
            <Grid container>
              <Grid item xs={6}>
                <FormControlLabel
                  value={-1}
                  control={<Radio />}
                  label="Tất cả"
                />
              </Grid>
              {brandOptions.map((brandOption) => (
                <Grid item xs={6} key={brandOption.id}>
                  <FormControlLabel
                    value={brandOption.id}
                    control={<Radio />}
                    label={brandOption.name}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Collapse>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={6} key={product.id}>
            <ProductCard {...product} image={product.mainImageUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default GroupCategoryPage;
