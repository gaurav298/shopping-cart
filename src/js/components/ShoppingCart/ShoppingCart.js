import React, { Component, Fragment } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as selectors from "../../selectors";
import { addToCart } from "../../actions";
import Header from "Components/Header/Header";

import "./ShoppingCart.css";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    addToCart(product) {
        const { shoppingCart } = this.props;
        this.props.addToCart(shoppingCart, product);
    }

    getShoppingCart(cart) {
        return cart.map(item => (
            <CartItem item={item} key={item.id} addToCart={addToCart} />
        ));
    }

    render() {
        const { shoppingCart } = this.props;
        return (
            <Fragment>
                <Header title="Your Cart" />
                <div className="container">
                    {shoppingCart && shoppingCart.length && (
                        <ul className="cartList">
                            {this.getShoppingCart(shoppingCart)}
                        </ul>
                    )}
                    {!shoppingCart.length && (
                        <p className="noItems">
                            You have no items in your cart!.
                        </p>
                    )}
                    <Link to="/" className="primaryBtn">
                        BACK TO SHOPPING
                    </Link>
                </div>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (cart, product) => dispatch(addToCart(cart, product))
    };
}

function mapStateToProps(state) {
    return {
        shoppingCart: selectors.cartSelector(state)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);

const CartItem = ({ product, addToCart }) => {
    const { productName } = product;
    return (
        <li className="makeFlex">
            <p className="makeFlex column">
                <img
                    src="public/images/dummyProduct.jpg"
                    className="dummyProduct"
                />
                <span
                    className="productName"
                    dangerouslySetInnerHTML={{ __html: productName }}
                />
            </p>
            <div className="makeFlex column">
                <div className="counter">
                    <span className="quantity">Quantity</span>
                    <span className={`${product.quantity=0?'disabled':''}`}>-</span>
                    <span>{product.quantity}</span>
                    <span onClick={() => addToCart(item)}>+</span>
                </div>
                <div className="price">{product.price}</div>
            </div>
        </li>
    );
};
