import React from 'react';
import { formatNumberToVnd } from '../../utils/currency';
import product from './../../apis/product';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';

const ProductCard = ({ id, title, price, discountPrice, image, state }) => {
  let navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate(`/products/${id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      variant="outlined">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ cursor: 'pointer' }}
          onClick={navigateToProductPage}
        />
        <CardContent
          onClick={navigateToProductPage}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexGrow: 1,
            cursor: 'pointer',
          }}
          style={{ paddingBottom: '0.5rem' }}>
          <Typography variant="subtitle1" component="p" align="center">
            <strong>{title}</strong>
          </Typography>
          <Box>
            {discountPrice && (
              <Typography
                variant="body2"
                style={{ textDecoration: 'line-through' }}
                component="p"
                align="right">
                <i>{formatNumberToVnd(price)}</i>
              </Typography>
            )}
            <Typography
              component="p"
              variant="subtitle1"
              color="red"
              align="right">
              <strong>
                {formatNumberToVnd(discountPrice ? discountPrice : price)}
              </strong>
            </Typography>
          </Box>
        </CardContent>
      </Box>
      <CardActions
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {state === product.availableState.available && (
          <>
            <Button variant="contained">Đặt hàng</Button>
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <AddShoppingCartIcon />
            </IconButton>
          </>
        )}

        {state === product.availableState.outStock && (
          <Button variant="contained">Liên hệ</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
