import { createSelector } from 'reselect';

const productListSelector = state => state.cart.productList;

export const productSelector = createSelector(productListSelector, product => {
    return product
});
