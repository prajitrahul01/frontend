

export const PRODUCT_INCREASE = "PRODUCT_INCREASE";
export const PRODUCT_DECREASE = "PRODUCT_DECREASE";
export const PRODUCT_REMOVE = "PRODUCT_REMOVE";

export const productIncrease = (cart) => ({
    type: PRODUCT_INCREASE,
    payload: cart
})

export const productDecrease = (cart) => ({
    type: PRODUCT_DECREASE,
    payload: cart
})

export const productRemove = (cart) => ({
    type: PRODUCT_REMOVE,
    payload: cart
})


