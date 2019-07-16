import React, { Component, Fragment } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as selectors from "../../selectors";
import { getProducList, getFilteredProducts, addToCart } from "../../actions";
import Header from "Components/Header/Header";

import "./Home.css";

class Home extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    componentDidMount() {
        this.props.getProducList();
    }

    getProducts(products) {
        return (products &&
            products.map(product => <ProductItem key={product.id} product={product} addToCart={this.addToCart} />));
    }

    handleChange(event) {
        const val = event.target.value;
        let filteredProducts;
        if (!val) {
            filteredProducts = undefined;
            this.props.getFilteredProducts(filteredProducts);
            return;
        }
        const {productList} = this.props;
        filteredProducts = productList.filter(product => product.productName.toLowerCase().indexOf(val.toLowerCase()) !== -1).map(product => ({id: product.id, productName: product.productName.toLowerCase().replace(val.toLowerCase(), `<span class="bold">${val}</span>`)}));
        this.props.getFilteredProducts(filteredProducts);
    }

    addToCart(product) {
        const {shoppingCart} = this.props;
        this.props.addToCart(shoppingCart, product);
    }

    render() {
        const { productList, loading, error, filteredProducts } = this.props;
        const list = filteredProducts || productList;
        return (
            <Fragment>
                <Header title="Product Listing" />
                <div className="container">
                    <div className="searchBoxContainer">
                        <input
                            type="text"
                            className="searchProducts"
                            placeholder="Search products by Name"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <Link to="/shoppingCart" className="primaryBtn">GO TO CART</Link>
                    </div>
                    <ul className="productList">
                        {this.getProducts(list)}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducList: () => dispatch(getProducList()),
        getFilteredProducts: (list) => dispatch(getFilteredProducts(list)),
        addToCart: (cart, product) => dispatch(addToCart(cart, product))
    };
}

function mapStateToProps(state) {
    return {
        productList: selectors.productSelector(state),
        loading: state.cart.loading,
        error: state.cart.error,
        filteredProducts: selectors.filteredProductSelector(state),
        shoppingCart: selectors.cartSelector(state)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

const ProductItem = ({ product, addToCart }) => {
    const { productName } = product;
    return (
        <li className="makeFlex column">
            <img src="public/images/dummyProduct.jpg" className="dummyProduct" />
            <span className="productName" dangerouslySetInnerHTML={{__html: productName}}></span>
            <span className="price">{product.price}</span>
            <a href="javascript:void(0);" className="addToCartLink" onClick={() => addToCart(product)}>
                Add To cart
            </a>
        </li>
    );
};
