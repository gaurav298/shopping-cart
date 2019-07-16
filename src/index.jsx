import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./js/store";
import { Provider } from "react-redux";
import "StyleSheets/common.css";
import Home from "Components/Home/Home";
import ShoppingCart from "Components/ShoppingCart/ShoppingCart";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/shoppingCart" component={ShoppingCart} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
