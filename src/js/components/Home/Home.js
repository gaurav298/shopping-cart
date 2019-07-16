import React, {Component} from "react";
import {connect} from "react-redux";
import * as selectors from "../../selectors";
import {getProducList} from "../../actions";

import "./Home.css";

class Home extends Component {
    componentDidMount() {
        this.props.getProducList();
    }

    render() {
        const {productList, loading, error} = this.props;
        console.log(productList);
        return (
            <div>gaurav</div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProducList: () => dispatch(getProducList()),
    };
}

function mapStateToProps(state) {
    return {
      productList: selectors.productSelector(state),
      loading: state.cart.loading,
      error: state.cart.error
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Home);
