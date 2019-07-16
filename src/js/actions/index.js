import consts from "../consts";
import {productDataTransformer} from "../transformers";

export const getProducList = () => {
    return async dispatch => {
        dispatch({
            type: consts.GET_DATA_START,
        })
        try {
            const res = await fetch("https://api.myjson.com/bins/9nyy3");
            const { results } = await res.json();
            dispatch({
                type: consts.GET_DATA,
                payload: productDataTransformer(results)
            });
        } catch (error) {
            dispatch({
                type: consts.GET_DATA_ERROR,
            })
        }
    };
};
