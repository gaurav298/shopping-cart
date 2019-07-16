import consts from "../consts";
import { productDataTransformer } from "../transformers";

export const getProducList = () => {
    return async dispatch => {
        dispatch({
            type: consts.GET_DATA_START
        });
        try {
            const response = await fetch(
                "https://gaurav298.github.io/shopping-cart/public/data/products.json"
            );
            const results = await response.json();
            dispatch({
                type: consts.GET_DATA,
                payload: productDataTransformer(results)
            });
        } catch (error) {
            dispatch({
                type: consts.GET_DATA_ERROR
            });
        }
    };
};

export const getFilteredProducts = list => {
    return {
        type: consts.FILTER_RESULTS,
        payload: list
    };
};

export const addToCart = (cart, product) => {
    if (cart && cart.length) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                cart[i].quantity += 1;
                return {
                    type: consts.MODIFY_CART,
                    payload: cart
                };
            }
        }
    }
    product.quantity = 1;
    return {
        type: consts.ADD_TO_CART,
        payload: product
    };
};
