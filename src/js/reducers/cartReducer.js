import consts from "../consts";

const cartReducer = (state = {shoppingCart: []}, action) => {
    switch (action.type) {
        case consts.GET_DATA:
            return {
                ...state,
                productList: action.payload,
                loading: false,
                error: false
            };
        case consts.GET_DATA_START:
            return {
                ...state,
                loading: true,
                error: false
            };
        case consts.GET_DATA_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };
        case consts.FILTER_RESULTS:
            return {
                ...state,
                filteredProducts: action.payload
            };
        case consts.ADD_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            };
        case consts.MODIFY_CART:
            return {
                ...state,
                shoppingCart: [...action.payload]
            };
        default:
            return state;
    }
};

export default cartReducer;
