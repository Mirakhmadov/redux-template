import * as authActionTypes from "./actionTypes/AuthActionTypes";

const apiMiddleware = ({dispatch}) => (next) => (action) => {
    if (!action.api) {
        return next(action);
    }
    const {api, types: [START, SUCCESS, ERROR], data} = action;

    dispatch({
        type: START
    });
    return api(data)
        .then((response) => {
            if (response || response.data || (response.data.success ||
                response.data.statusCode === 201 || response.data.statusCode === 204 || response.data.statusCode === 200)) {

                dispatch({
                    type: SUCCESS,
                    payload: response.data
                });

                //then uchun add va editlarga...
                return {
                    payload: response.data,
                    data,
                    success: true,
                    statusCode: response.data.statusCode
                }
            } else if (response.data.statusCode === 401) {
                dispatch({
                    type: authActionTypes.AUTH_LOGOUT
                })
            } else {
                dispatch({
                    type: ERROR
                })
            }
        }).catch(error => {
            dispatch({
                type: ERROR
            })
            throw error;
        })

}


export default apiMiddleware