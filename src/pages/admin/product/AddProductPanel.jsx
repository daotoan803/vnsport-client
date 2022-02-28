import React, { useState, useEffect, useRef } from 'react';

import brandApi from './../../../apis/brandApi';
import categoryApi from './../../../apis/categoryApi';
import ImagePreviewContainer from './../../../components/image/ImagePreviewContainer';
import productApi from './../../../apis/productApi';
import LoadingButton from '@mui/lab/LoadingButton';

import {
  Container,
  Typography,
  Grid,
  TextField,
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

const availableStates = {
  hidden: { value: 'hidden', label: 'Ẩn' },
  outStock: { value: 'outStock', label: 'Hết hàng' },
  available: { value: 'available', label: 'Mở bán' },
};

const createImageObject = (file) => {
  return {
    url: URL.createObjectURL(file),
    name: file.name,
    file: file,
  };
};

const titleIsValid = (title) => {
  return (title.trim().length >= 4 && title.length < 100) || !title;
};

const priceIsValid = (price) => {
  return price > 0 || !price;
};

const discountPriceIsValid = (price, discountPrice) => {
  return (
    (discountPrice > 0 && discountPrice < price) ||
    discountPrice === 0 ||
    !discountPrice
  );
};

const availableQuantityIsValid = (quantity) => {
  return quantity >= 0 || !quantity;
};

const detailIsValid = (detail) => {
  return detail.trim().length >= 1 || !detail;
};

const warrantyPeriodByDayIsValid = (warrantyPeriodByDay) => {
  return warrantyPeriodByDay >= 0 || !warrantyPeriodByDay;
};

const AddProductPanel = () => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [warrantyPeriodByDay, setWarrantyPeriodByDay] = useState('');
  const [state, setState] = useState(availableStates.available.value);
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState([]);

  const [titleErr, setTitleErr] = useState(false);
  const [titleNotUniqueErr, setTitleNotUniqueErr] = useState(false);
  const [detailErr, setDetailErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [discountPriceErr, setDiscountPriceErr] = useState(false);
  const [availableQuantityErr, setAvailableQuantityErr] = useState(false);
  const [warrantyPeriodByDayErr, setWarrantyPeriodByDayErr] = useState(false);
  const [haveErr, setHaveErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBrandOptions(setBrandOptions);
    fetchCategoryOptions(setCategoryOptions);
  }, []);

  useEffect(() => {
    setTitleErr(!titleIsValid(title));

    const debounce = setTimeout(async () => {
      if (title.trim() === '') return;
      productApi.checkProductTitleIsValid(title).then((res) => {
        if (res.status === 409) {
          setTitleErr(true);
          setTitleNotUniqueErr(true);
        } else {
          setTitleNotUniqueErr(false);
        }
      });
    }, 300);

    return () => window.clearTimeout(debounce);
  }, [title]);

  useEffect(() => {
    setPriceErr(!priceIsValid(price));
    setDiscountPriceErr(!discountPriceIsValid(price, discountPrice));
  }, [price, discountPrice]);

  useEffect(() => {
    setAvailableQuantityErr(!availableQuantityIsValid(availableQuantity));
    if (availableQuantity === 0) {
      setState(availableStates.outStock.value);
    }
  }, [availableQuantity]);

  useEffect(() => {
    setWarrantyPeriodByDayErr(!warrantyPeriodByDayIsValid(warrantyPeriodByDay));
  }, [warrantyPeriodByDay]);

  useEffect(() => {
    setDetailErr(!detailIsValid(detail));
  }, [detail]);

  useEffect(() => {
    setHaveErr(
      titleErr ||
        detailErr ||
        priceErr ||
        discountPriceErr ||
        availableQuantityErr ||
        warrantyPeriodByDayErr
    );
  }, [
    titleErr,
    detailErr,
    priceErr,
    discountPriceErr,
    availableQuantityErr,
    warrantyPeriodByDayErr,
  ]);

  const addProduct = async () => {
    if (loading) return;
    if (
      haveErr ||
      !title ||
      !detail ||
      !price ||
      !availableQuantity ||
      !warrantyPeriodByDay ||
      !brandId ||
      !categoryId ||
      images.length === 0
    ) {
      setHaveErr(true);
      return;
    }

    setLoading(true);
    const res = await productApi.addProduct({
      title,
      detail,
      price,
      discountPrice,
      warrantyPeriodByDay,
      availableQuantity,
      state,
      brandId,
      categoryId,
      images: images.map((image) => image.file),
    });

    setLoading(false);
    if (res.status === 200) {
      alert('Thêm sản phẩm thành công');
    } else {
      if (res.status === 409) {
        setErrorMessage('Tên sản phẩm đã tồn tại');
      }
      if (res.status === 500) {
        setErrorMessage('Server lỗi, vui lòng liên hệ trợ giúp');
      }
    }
  };

  const previewImagesInputRef = useRef(null);

  const removePreviewImage = (imageName) => {
    setImages((prev) => {
      return prev.filter((image) => image.name !== imageName);
    });
  };

  const onPreviewImageSelect = (e) => {
    const newImages = [];

    for (const file of e.target.files) {
      const existedImage = images.find((image) => image.name === file.name);
      if (existedImage) continue;
      newImages.push(createImageObject(file));
    }

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
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            error={titleErr}
            helperText="Từ 4 tới 100 ký tự"
            value={title}
            onChange={(e) => {
              if (e.target.value.length > 100) return;
              setTitle(e.target.value);
            }}
            label="Tên sản phẩm"
            required
          />
          {titleNotUniqueErr && (
            <Typography color="error">Tên sản phẩm đã tồn tại</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={detail}
            error={detailErr}
            onChange={(e) => setDetail(e.target.value)}
            label="Chi tiết sản phẩm"
            multiline
            required
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <TextField
            fullWidth
            value={price}
            error={priceErr}
            onChange={(e) => {
              if (e.target.value < 0) return setPrice(0);
              setPrice(+e.target.value);
            }}
            label="Giá"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <TextField
            fullWidth
            error={discountPriceErr}
            value={discountPrice}
            onChange={(e) => {
              if (e.target.value < 0) return setDiscountPrice(0);
              setDiscountPrice(+e.target.value);
            }}
            label="Giá khuyến mãi"
            helperText="Giá khuyến mãi phải nhỏ hơn giá bán"
            type="number"
          />
        </Grid>
        <Grid item xs={6} lg={4}>
          <TextField
            fullWidth
            error={availableQuantityErr}
            value={availableQuantity}
            onChange={(e) => {
              if (e.target.value < 0) return setAvailableQuantity(0);
              setAvailableQuantity(+e.target.value);
            }}
            label="Số lượng sản phẩm"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={6} lg={4}>
          <TextField
            fullWidth
            error={warrantyPeriodByDayErr}
            value={warrantyPeriodByDay}
            onChange={(e) => {
              if (e.target.value < 0) return setWarrantyPeriodByDay(0);
              setWarrantyPeriodByDay(+e.target.value);
            }}
            label="Thời gian bảo hành tính theo ngày"
            helperText="Thời gian bảo hành tính theo ngày"
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            value={state}
            onChange={(e) => {
              if (availableQuantity == 0) {
                return setState(availableStates.outStock.value);
              }
              setState(e.target.value);
            }}
            label="trạng thái"
            select
            required>
            {renderSelectOption(Object.values(availableStates))}
          </TextField>
        </Grid>
        <Grid item xs={12} lg={5}>
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
        <Grid item xs={12} lg={5}>
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
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            px: 2,
            mt: 2,
            gap: 2,
          }}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onPreviewImageSelect}
            ref={previewImagesInputRef}
            hidden
          />
          <Typography variant="h6">Ảnh preview sản phẩm *</Typography>
          <Button
            variant="outlined"
            onClick={() => previewImagesInputRef.current.click()}>
            Tải lên ảnh
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ImagePreviewContainer
            images={images}
            onRemoveImage={removePreviewImage}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent={'center'}>
        {haveErr && (
          <Typography variant="h6" color="error">
            Vui lòng sửa hết lỗi và điền đầy đủ các mục có đánh dấu *
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="h6" color="error">
            {errorMessage}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} container justifyContent={'center'} sx={{ mt: 3 }}>
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          onClick={addProduct}>
          Thêm sản phẩm
        </LoadingButton>
      </Grid>
    </Container>
  );
};

export default AddProductPanel;
