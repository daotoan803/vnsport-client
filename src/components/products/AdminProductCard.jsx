import React, { useState } from 'react';
import { formatNumberToVnd } from './../../utils/currency.utils';

import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const AdminProductCard = ({ product }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Grid
      item
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      component={Card}
      xs={12}
      lg={6}
      key={product.id}
      sx={{
        height: 130,
        display: 'flex',
      }}
      variant="outlined">
      <CardMedia
        component="img"
        image={product.mainImageUrl}
        sx={{ height: '100%', width: 'auto' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="caption" sx={{ mr: 2 }}>
          Số lượng: {product.availableQuantity}
        </Typography>
        <Typography variant="caption" sx={{ mr: 2 }}>
          Đã bán: {product.soldCount}
        </Typography>
        <Typography variant="caption">Trạng thái: {product.state}</Typography>
        <Typography variant="subtitle1">
          Giá gốc: {formatNumberToVnd(product.price)}
        </Typography>
        {product.discountPrice && (
          <Typography variant="body1">
            Giá khuyến mãi: {formatNumberToVnd(product.discountPrice)}
          </Typography>
        )}
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        {isHover && (
          <>
            <Button
              variant="contained"
              size="small"
              color="success"
              sx={{ width: '100%' }}>
              Chỉnh sửa
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ width: '100%' }}>
              Xóa
            </Button>
          </>
        )}
      </CardActions>
    </Grid>
  );
};

export default AdminProductCard;
