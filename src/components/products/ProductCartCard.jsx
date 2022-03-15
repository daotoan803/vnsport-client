import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatNumberToVnd } from './../../utils/currency.utils';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';

const ProductCartCard = ({
  product,
  onUpdateQuantity,
  onDelete,
  isUpdatingQuantity = false,
  disableUpdateQuantity = false,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const navigate = useNavigate();
  const updateQuantity = () => {
    onUpdateQuantity(product.id, quantity);
  };

  const onCardClick = () => {
    navigate(`/product/${product.id}`);
    
  };

  return (
    <Grid container component={Card} sx={{ cursor: 'pointer' }}>
      <Grid item xs={4}>
        <CardMedia
          component="img"
          width="100%"
          image={product.mainImageUrl}
          alt={product.title}
        />
      </Grid>
      <Grid item xs={8}>
        <CardContent>
          <Typography>{product.title}</Typography>
        </CardContent>
        <Box
          sx={{
            px: 2,
            pb: 1,
            gap: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box display="flex" alignItems="center" sx={{ gap: 1 }}>
              <label htmlFor="quantity">Số lượng :</label>
              <Tooltip title={`Có sẵn: ${product.availableQuantity} sản phẩm`}>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onClick={(e) => e.stopPropagation()}
                  onChange={({ target: { value } }) => {
                    if (value < 1) return setQuantity(1);
                    setQuantity(Math.min(product.availableQuantity, value));
                  }}
                  disabled={isUpdatingQuantity || disableUpdateQuantity}
                  onBlur={updateQuantity}
                  style={{ padding: '10px', width: '70px' }}
                />
              </Tooltip>
            </Box>
            <Typography variant="body1">
              {formatNumberToVnd(
                quantity * (product.discountPrice || product.price)
              )}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" onClick={onCardClick}>
              Xem
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={() => onDelete(product.id)}>
              Xóa
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductCartCard;
