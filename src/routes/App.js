import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import store from "../redux";
import {connect, Provider} from "react-redux";
import PublicRoute from "../utils/MainUtils/PublicRoute";
import PrivateRoute from "../utils/MainUtils/PrivateRoute";
import Login from "../pages/Auth/Login";
import Cabinet from "../pages/Cabinet/Cabinet";
import {makeLowerCase} from "../utils/SecondaryFuncs/StringFuncs";
import {ROLE} from "../utils/constants";
import NotFound from "../pages/Public/NotFound";
import Home from "../pages/Public/Home";


class App extends Component {
    render() {

        let role = makeLowerCase(localStorage.getItem(ROLE)) ?? ""

        return (
            <Provider store={store}>
                <Switch>
                    <PublicRoute exact path="/" component={Home}/>
                    <PublicRoute exact path="/login" component={Login}/>


                    <PrivateRoute path={`/${role}/:page/:subpage/:identity`} component={Cabinet}/>
                    <PrivateRoute path={`/${role}/:page/:subpage`} component={Cabinet}/>
                    <PrivateRoute path={`/${role}/:page`} component={Cabinet}/>
                    <PrivateRoute path={`/${role}`} component={Cabinet}/>

                    <Route path={"/not-found"} component={NotFound}/>

                </Switch>
            </Provider>
        );
    }
}

App.propTypes = {};

export default App;