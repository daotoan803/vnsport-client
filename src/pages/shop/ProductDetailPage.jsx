import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import productApi from '../../apis/product.api';
import {
  Container,
  Box,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import OpenableImage from '../../components/image/OpenableImage';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { formatNumberToVnd } from './../../utils/currency.utils';
import CartContext from './../../contexts/CartContext';
import AuthContext from './../../contexts/AuthContext';
import ToggleLoginModalButton from '../../components/button/ToggleLoginModalButton';
import ToggleSignupModalButton from '../../components/button/ToggleSignupModalButton';
import { state } from './../../enums/product.enum';

const ProductDetailPage = () => {
  const { id: productId } = useParams();

  const { status, data } = useQuery(['product', productId], () =>
    productApi.getProduct(productId)
  );

  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  if (status !== 'success') return <h1>...Loading</h1>;
  const product = data.data;
  console.log(product);

  return (
    <Grid component={Container} container spacing={5}>
      <Grid item xs={12}>
        <Breadcrumbs>
          <Link
            underline="hover"
            key="1"
            color="inherit"
            component={RouterLink}
            to={`/products/${product.category.categoryGroup.code}`}>
            {product.category.categoryGroup.name}
          </Link>
          <Link
            underline="hover"
            key="2"
            color="inherit"
            component={RouterLink}
            to={`/products/${product.category.categoryGroup.code}/${product.category.code}`}>
            {product.category.name}
          </Link>
          <Link underline="hover" key="3" color="inherit">
            {product.title}
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={6}>
        <OpenableImage src={product.mainImageUrl} width="100%" />
        <Box sx={{ height: 150, display: 'flex', gap: 1, overflow: 'auto' }}>
          {product.productImages.map((image) => (
            <OpenableImage key={image.id} height="100%" src={image.url} />
          ))}
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box>
          <Typography variant="h3">{product.title}</Typography>
          <Box sx={{ display: 'flex', gap: 4 }} mb={3}>
            <Typography variant="h4" color="error">
              {formatNumberToVnd(product.discountPrice || product.price)}
            </Typography>
            {!product.discountPrice && (
              <Typography
                variant="h6"
                sx={{ textDecoration: 'line-through', color: '#6e6e6e' }}>
                <i>
                  {formatNumberToVnd(product.discountPrice || product.price)}
                </i>
              </Typography>
            )}
          </Box>
          <Typography variant="subtitle2">
            Đã bán: {product.soldCount}
          </Typography>
          <Typography variant="subtitle2">
            Thương hiệu: {product.brand.name}
          </Typography>
          <Typography variant="subtitle2">
            Bảo hành: {product.warrantyPeriodByDay} ngày
          </Typography>
        </Box>
        <Box mt={10} display="flex" justifyContent="center" gap={3}>
          {product.state !== state.outStock && (
            <>
              {authContext.isLoggedIn && (
                <>
                  <Button variant="contained" color="primary">
                    Đặt mua ngay
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => cartContext.addProduct(product.id)}>
                    Thêm vào giỏ hàng
                  </Button>
                </>
              )}
              {!authContext.isLoggedIn && (
                <>
                  <ToggleSignupModalButton />
                  <ToggleLoginModalButton />
                </>
              )}
            </>
          )}
          {product.state === state.outStock && (
            <Typography variant="h5" color="error">
              Liên hệ
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{product.detail}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;
