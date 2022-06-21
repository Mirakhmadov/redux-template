import React from 'react';
import {connect} from 'react-redux';
import store from "../../redux";
import {Redirect, Route, withRouter} from 'react-router-dom';
import {userMe} from "../../redux/actions/AuthActions";
import {ROLE, TOKEN} from "../constants";
import {makeLowerCase} from "../SecondaryFuncs/StringFuncs";


const PrivateRoute = ({dispatch, auth, path, history, location, component: Component, ...rest}) => {
    dispatch(userMe())

    const filterRole = (props) => {
        const role = localStorage.getItem(ROLE);
        const {auth: {roles}} = store.getState()

        if (path.includes('/end-register')) {
            return <Component {...props} />
        } else if (roles.includes(role) && path.includes(makeLowerCase(role))) {
            return <Component {...props} />
        } else {
            return <Redirect to={'/badRequest'}/>
        }
    }

    return (
        <Route
            path={path}
            {...rest}
            render={(props) =>
                localStorage.getItem(TOKEN) !== null ?
                    filterRole(props)
                    : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {from: props.location}
                            }}
                        />
                    )
            }
        />
    )
}
export default connect(({privateRoute, auth}) => ({privateRoute, auth}))(
    withRouter(PrivateRoute)
);
