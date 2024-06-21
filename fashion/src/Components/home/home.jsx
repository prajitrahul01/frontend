import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './home.css';
import { fetchData1 } from '../redux/action/fetchShop';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BasicGrid = () => {
  const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData1())
    }, [dispatch])

  const cardData = useSelector(state => state.fetchUser.shop_data);
  if (!cardData) {
    return <p>Data not available</p>;
  }
  const slicedCardData = cardData.slice(0,5);

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid container spacing={1}>
        {slicedCardData.map((card) => (
          <Grid key={card.id} item xs={12} md={card.routeName === 'womens' || card.routeName === 'mens' ? 6 : 4}>
            <Card>
            <Link to={`/${card.routeName}`}> 
                <div className="container">
                  <CardMedia
                    component="img"
                    height="240"
                    image={card.image}
                    alt={card.title}
                  />
                  <div className="text-block">
                    <h3 style={{ fontFamily: 'Bigelow Rules' }}>{card.title}</h3>
                    <p>SHOP NOW</p>
                  </div>
                </div>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default BasicGrid;