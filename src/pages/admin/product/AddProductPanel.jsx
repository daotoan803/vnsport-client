import React, { useState, useEffect, useRef } from 'react';

import brandApi from './../../../apis/brandApi';
import categoryApi from './../../../apis/categoryApi';

import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Button,
  MenuItem,
} from '@mui/material';

const renderSelectOption = (options) => {
  return options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));
};

const fetchBrandOptions = async (setBrandOptions) => {
  const res = await brandApi.getBrands({});
  const brands = res.data.map((brand) => ({
    value: brand.id,
    label: brand.name,
  }));
  setBrandOptions(brands);
};

const fetchCategoryOptions = async (setCategoryOptions) => {
  const res = await categoryApi.getCategories();
  const categories = res.data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  setCategoryOptions(categories);
};

const availableStates = [
  { value: 'hidden', label: 'Ẩn' },
  { value: 'outstock', label: 'Hết hàng' },
  { value: 'available', label: 'Mở bán' },
];

const AddProductPanel = () => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [state, setState] = useState('');
  const [brandId, setBrandId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const [titleErr, setTitleErr] = useState(false);
  const [detailErr, setDetailErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [discountPriceErr, setDiscountPriceErr] = useState(false);
  const [availableQuantityErr, setAvailableQuantityErr] = useState(false);

  useEffect(() => {
    fetchBrandOptions(setBrandOptions);
    fetchCategoryOptions(setCategoryOptions);
  }, []);

  const fileInputRef = useRef(null);
  const onImageSelect = (e) => {
    const newImages = [];

    for (const file of e.target.files) {
      newImages.push({
        name: file.name,
        file: file,
        url: URL.createObjectURL(file),
      });
    }
    console.log(newImages);

    setImages((prevImages) => {
      return [...prevImages, ...newImages];
    });
  };

  return (
    <Container>
      <Typography variant="h5" align="center">
        Thêm sản phẩm mới
      </Typography>
      <Grid container sx={{ py: 2 }} spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Tên sản phẩm"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            label="Chi tiết sản phẩm"
            multiline
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Giá"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            label="Giá khuyến mãi"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
            label="Số lượng sản phẩm"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={state}
            onChange={(e) => setState(e.target.value)}
            label="trạng thái"
            select
            required>
            {renderSelectOption(availableStates)}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={brandId}
            onChange={(e) => setBrandId(e.target.value)}
            label="Thương hiệu"
            select
            required>
            {renderSelectOption(brandOptions)}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            label="Danh mục"
            select
            required>
            {renderSelectOption(categoryOptions)}
          </TextField>
        </Grid>
        <input type="file" hidden onChange={onImageSelect} ref={fileInputRef} />
        <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
          Chọn ảnh sản phẩm
        </Button>
      </Grid>
    </Container>
  );
};

export default AddProductPanel;
