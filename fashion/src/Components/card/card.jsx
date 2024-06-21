import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import './card.css';
import CustomButton from '../../custom-button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/action/addToCart';
import { productIncrease } from '../redux/action/actionCart';

const CustomCard = ({ products }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const handleClick = () => {
    const exists = cart.findIndex(cartItem => cartItem.id === products.id);
    if(exists !== -1){
      dispatch(productIncrease(products))
    }
    else{
      dispatch(addToCart(products));
    }

  }

  return (
    <div style={{ minWidth: '250px', aspectRatio: '4 / 3', margin: '16px' }}>
      <Grid item xs={12} md={12}>
        <Card style={{ height: '100%' }}>
          <div className='card'>
          <CardMedia
            component="img"
            alt={products.name}
            height="200"
            image={products.imageUrl}
          />
          <div className="container1">
            <div className="text-block1" onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            <CustomButton className="custom-button" variant="contained" 
            type='submit' style={{ backgroundColor: isHovered ? 'black' : 'white', color: isHovered ? 'white' : 'black' }} 
            onClick={handleClick}
            >Add to Cart</CustomButton>
            </div>
          </div>
          </div>
          <CardContent>
            <Typography variant="h6">{products.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Price: ${products.price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default CustomCard;
