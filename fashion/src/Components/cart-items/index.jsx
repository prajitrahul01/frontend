import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ShoppingBagSvg from './shopping-bag.svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import { useEffect } from 'react';
import CustomButton from '../../custom-button';
import { productDecrease, productIncrease } from '../redux/action/actionCart';
import StripeCheckout from "react-stripe-checkout";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '290px',
    maxHeight: '300px', 
    overflowY: 'auto',
}));

const ItemContent = styled('div')({
    display: 'flex',
    justifyItems: 'justify',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '8px',

});

//item name
const ItemDetails = styled('div')({
    display: 'flex',
    alignItems: 'center',
});

const ItemButton = styled('div')({
    display: 'flex',
    marginLeft: '16px',

})

//image
const ItemImage = styled('img')({
    height: '50px',
    width: '50px',
    marginRight: '16px',
});

export default function MenuListComposition() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart);

    const [open, setOpen] = useState(false);

    const anchorRef = useRef(null);

    const itemsList = Array.isArray(cart) ? cart : [];

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    const onToken = (token) => {
        fetch("/save-stripe-token", {
            method: "POST",
            body: JSON.stringify(token),
        }).then((response) => {
            response.json().then((data) => {
                alert(`We are in business, ${data.email}`);
            });
        });
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    function handlePlus(item) {
        dispatch(productIncrease(item));
    }
    function handleMinus(item) {
        dispatch(productDecrease(item));
    }
    return (
        <Stack direction="row" spacing={2}>
            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <img src={ShoppingBagSvg} alt="Shopping Bag" style={{ paddingLeft: '7px', height: '26px' }} />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    //z-index
                    style={{ zIndex: 9999 }}

                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Item>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {itemsList.map(item => {
                                            console.log("Items: ", item);
                                            return (
                                                <MenuItem key={item.name} >
                                                    <ItemContent>
                                                        <ItemDetails>
                                                            <ItemImage src={item.imageUrl} alt={item.name} />
                                                            <div>
                                                                <div>{item.name}</div>
                                                                <div>{item.quantity} - ${item.quantity * item.price}</div>
                                                            </div>

                                                        </ItemDetails>
                                                        <ItemButton>

                                                            <button onClick={() => handlePlus(item)}>+</button>

                                                        </ItemButton>
                                                        <ItemButton>
                                                            <button onClick={() => handleMinus(item)}>-</button>
                                                        </ItemButton>

                                                    </ItemContent>
                                                </MenuItem>

                                            )
                                        })}
                                        <StripeCheckout
                                            token={onToken}
                                            stripeKey="pk_test_51OuUubSGWIKCsaAKNCRti2yCmh0VQU675Wzo8d4SkqvkhgTKBr71jGQatJdkVEs38A0rYjoKmtkiDadgVsBBOArS00vWrQghDZ"
                                        >
                                        <CustomButton variant="contained" style={{ backgroundColor: 'black' }}>GO TO CHECKOUT</CustomButton>
                                        </StripeCheckout>
                                    </MenuList>

                                </ClickAwayListener>
                            </Item>

                        </Grow>
                    )}

                </Popper>

            </div>

        </Stack>
    );
}
