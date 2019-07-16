import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./js/store";
import { Provider } from "react-redux";
import "StyleSheets/common.css";
import Home from "Components/Home/Home";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        {/* <Route path="/cart" component={shoppingCart} /> */}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
