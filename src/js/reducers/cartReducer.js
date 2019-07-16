import consts from "../consts";

const cartReducer = (state = [], action) => {
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
        default:
            return state;
    }
};

export default cartReducer;
