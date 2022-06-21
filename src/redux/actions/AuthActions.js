import * as types from "../actionTypes/AuthActionTypes";
import {
    loginUserAuthApi,
    registerAuthApi,
} from "../../api/AuthApi.js";
import {ROLE, TOKEN} from "../../utils/constants";
import {
    meAuthApi,
} from "../../api/AuthApi";
import {toast} from "react-toastify";
import jwt from "jwt-decode";
import {makeLowerCase} from "../../utils/SecondaryFuncs/StringFuncs";

export const login = (payload) => async (dispatch, getState) => {
    try {
        const res = await dispatch({
            api: loginUserAuthApi,
            types: [types.REQUEST_AUTH_START, "", types.REQUEST_API_ERROR],
            data: payload.v,
        });
        if (res.success) {
            let parsedToken = jwt(res.payload.object.token);
            setTimeout(() => {

                setStateRole(parsedToken.role, dispatch, getState);
                pushHisPage(parsedToken.role, payload.history,getState);
            }, 1000);
            localStorage.setItem(
                TOKEN,
                res.payload.object.tokenType + " " + res.payload.object.token
            );
        }
        return true;
    } catch (err) {
        if (err.response) toast.error(err.response.data.message);
        return false;
    }
};

export const registerAction = (payload) => (dispatch) => {
    dispatch({
        api: registerAuthApi,
        types: [
            types.REQUEST_AUTH_START,
            types.REGISTER_USER,
            types.REQUEST_AUTH_ERROR
        ],
        data: payload.v
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                userMail: payload.v.email
            }
        })
        pushPage(payload.history, "/verify")
    }).catch(err => {
        toast.error("Something went wrong!");
    })
};

export const userMe = (payload) => async (dispatch, getState) => {
    const {
        auth: {currentUser, sentUserMe},
    } = getState();

    if (sentUserMe || currentUser || !localStorage.getItem(TOKEN)) return;
    try {
        const response = await dispatch({
            api: meAuthApi,
            types: [
                types.AUTH_GET_CURRENT_USER_REQUEST,
                types.AUTH_GET_USER_TOKEN_SUCCESS,
                types.AUTH_GET_CURRENT_USER_ERROR,
            ],
        });
        if (response.success) {
            if (payload) {
                dispatch({
                    type: "updateStateOrder",
                    payload: {currentUser: response.payload.object},
                });
            }
            dispatch({
                type: types.AUTH_GET_USER_TOKEN_SUCCESS,
                payload: response.payload.object,
            });
            setStateRole(response.payload.object.role, dispatch, getState);
        } else {
            dispatch({
                type: types.AUTH_LOGOUT,
            })
        }
    } catch (e) {
        dispatch({
            type: types.AUTH_LOGOUT,
        });
    }
};


export const logout = () => (dispatch) => {
    dispatch({
        type: types.AUTH_LOGOUT,
    });
};

const setStateRole = (role, dispatch, getState) => {
    const {auth: {roles}} = getState();

    localStorage.setItem(ROLE, roles.filter(item => item === role.roleName));
};

const pushHisPage = (role, history, getState) => {
    const {push} = history;
    const {auth: {roles}} = getState();

    if (roles.includes(role.roleName)){
        push("/" + makeLowerCase(role.roleName) + "/home")
    }else {
        logout()
    }
};

const pushPage = (history, link) => {
    const {push} = history;
    push(link);
}

