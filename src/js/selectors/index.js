import { createSelector } from 'reselect';

const productListSelector = state => state.cart.productList;

const filterProductListSelector = state => state.cart.filteredProducts;

const cartListSelector = state => state.cart.shoppingCart;

export const productSelector = createSelector(productListSelector, product => {
    return product;
});

export const filteredProductSelector = createSelector(filterProductListSelector, product => {
    return product;
});

export const cartSelector = createSelector(cartListSelector, cart => {
    return cart;
});
