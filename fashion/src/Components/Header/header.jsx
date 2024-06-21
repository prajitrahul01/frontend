import React from 'react';
import { AppBar, Grid, IconButton, styled } from '@mui/material';
import './header.css';
import MenuListComposition from '../cart-items';
import { Link } from 'react-router-dom';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

const Header = () => {
  const accessToken = localStorage.getItem('accessToken');

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/signup'
    // Additional logic for sign-out action if needed
  };
  
  return (
    <AppBar position="static" style={{ backgroundColor: 'transparent'}}>
      <Grid container spacing={3} alignItems="center" justifyContent="space-between">
        <Grid item xs={6} md={2}>
          <Item>
            <IconButton>
              <div className='links'><Link to="/home"><img src={'./favicon.ico'} className='img-css' alt='logo' /></Link></div>
            </IconButton>
          </Item>
        </Grid>
        <Grid item container xs={6} md={10} justifyContent="flex-end" className='right-links'>
          <Item><Link className='links' to="/shops">SHOP</Link></Item>
          <Item><Link className='links' to="/contact">CONTACT</Link></Item>
          {accessToken ? (
            <Item>
              <Link className='links' onClick={handleSignOut} to="/signup">SIGN OUT</Link>
            </Item>
          ) : (
            <Item><Link className='links' to="/signup">SIGN IN</Link></Item>
          )}
          <MenuListComposition/>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Header;
