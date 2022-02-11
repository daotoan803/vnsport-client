import React from 'react';
import { formatNumberToVnd } from '../../utils/currency.utils';
import product from './../../apis/product';

import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const ProductCard = ({
  id,
  title,
  price,
  discountPrice,
  image,
  state,
  visitedCount,
  reviewCount,
}) => {
  let navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate(`/product/${id}`);
  };

  const isOutStock = state === product.availableState.outStock;

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
          sx={{ cursor: 'pointer', minHeight: 150 }}
          onClick={navigateToProductPage}
        />
        <CardContent
          onClick={navigateToProductPage}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            flexGrow: 1,
            cursor: 'pointer',
          }}
          style={{ paddingBottom: '0.5rem' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            <Box display="flex" alignItems="center">
              <Rating size="small" sx={{ mr: 0.5 }} readOnly></Rating>
              <Typography fontSize="0.9rem">({reviewCount})</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ fontSize: '1rem' }}>
              <RemoveRedEyeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              <Typography fontSize="inherit">{visitedCount}</Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" component="p" align="center">
            <strong>{title}</strong>
          </Typography>
          <Box>
            {!isOutStock && (
              <>
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
              </>
            )}
            {isOutStock && (
              <Typography component="p" variant="subtitle1" align="right">
                <strong>Liên hệ</strong>
              </Typography>
            )}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard;
