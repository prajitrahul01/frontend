import { Box, Grid } from "@mui/material";
import CustomCard from "../card/card";
import Product from "../product/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData1 } from "../redux/action/fetchShop";
import SearchInput from "../search-input";

const CardList = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData1())
    }, [dispatch]);

    const [filteredProducts, setFilteredProducts] = useState(null);

    const productsAndCategory = useSelector(state => state.fetchUser.shop_data);
    const isLoading = useSelector(state => state.fetchUser.isLoading);
    const error = useSelector(state => state.fetchUser.error);

    useEffect(() => {
        if (productsAndCategory && productsAndCategory[props.num]) {
            const products = productsAndCategory[props.num].items;
            if (products) {
                setFilteredProducts(products);
            }
        }
    }, [productsAndCategory, props.num]);

    const handleChange = (event) => {
        const { value } = event.target;
        if (productsAndCategory && productsAndCategory[props.num]) { 
            const filterProducts = productsAndCategory[props.num].items.filter(
                product =>
                    product.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredProducts(filterProducts);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {productsAndCategory && productsAndCategory[props.num] && ( 
                <>
                    <Product name={productsAndCategory[props.num].title}/>
                    <SearchInput handleChange={handleChange}/>
                    <Box sx={{ flexGrow: 1, margin:10 }}>
                        <Grid container direction="row" spacing={1}>
                            {filteredProducts && filteredProducts.map((product, index) => (
                                <CustomCard key={index} products={product} />
                            ))}
                        </Grid>
                    </Box>
                </>
            )}
        </div>
    );
};

export default CardList;
