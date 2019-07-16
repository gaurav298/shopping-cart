import React, { Component, Fragment } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as selectors from "../../selectors";
import { addToCart, removeFromCart } from "../../actions";
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

    removeFromCart(product) {
        const { shoppingCart } = this.props;
        this.props.removeFromCart(shoppingCart, product);
    }

    getShoppingCart(cart) {
        return cart.map(item => (
            <CartItem item={item} key={item.id} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />
        ));
    }

    render() {
        const { shoppingCart } = this.props;
        return (
            <Fragment>
                <Header title="Your Cart" />
                <div className="cart container">
                    {shoppingCart && shoppingCart.length && (
                        <ul className="cartList">
                            {this.getShoppingCart(shoppingCart)}
                        </ul>
                    )}
                    {!shoppingCart.length && (
                        <p className="noItems">
                            You have no items in your cart!
                        </p>
                    )}
                    <p className="backBtn"><Link to="/" className="primaryBtn">
                        BACK TO SHOPPING
                    </Link></p>
                </div>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (cart, product) => dispatch(addToCart(cart, product)),
        removeFromCart: (cart, product) => dispatch(removeFromCart(cart, product))
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

const CartItem = ({ item, addToCart, removeFromCart }) => {
    const { productName, quantity, price } = item;
    return (
        <li className="makeFlex vrtlCenter">
            <p className="makeFlex column vrtlCenter appendRight50">
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
                    <span onClick={() => removeFromCart(item)}>-</span>
                    <span>{quantity}</span>
                    <span onClick={() => addToCart(item)}>+</span>
                </div>
                <div className="makeFlex price vrtlCenter">
                    <span className="appendRight20">Price: </span>
                    <span>₹{price}</span>
                </div>
            </div>
        </li>
    );
};
