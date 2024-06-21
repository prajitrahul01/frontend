import { Box, Grid } from "@mui/material";
import CustomCard from "../card/card";
import Product from "../product/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData1 } from "../redux/action/fetchShop";

const Shop = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData1())
    }, [dispatch])

    const productsAndCategory = useSelector(state => state.fetchUser.shop_data);

    if (!productsAndCategory) {
        return <p>Data not available</p>;
    }
    return (

        <div className="">
            {productsAndCategory.map((categoryProduct, categoryProductIndex) => {
                return (
                    <div key={categoryProductIndex}>
                        <Product name={categoryProduct.title} />
                        <Box sx={{ flexGrow: 1, margin: 10 }}>
                            <Grid container direction="row" spacing={1}>
                                {categoryProduct.items.slice(0, 4).map((product, index) => (
                                    <CustomCard key={index} products={product} />
                                ))}
                            </Grid>
                        </Box>
                    </div>
                )
            })}
        </div>


    )
}
export default Shop;
