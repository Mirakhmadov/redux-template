import * as types from "../actionTypes/AppActionTypes";
import {sendCatch, sendThen} from "./responseFuncs";
import {changeStateArray} from "../../utils/SecondaryFuncs/StateFuncs";
import {
    deleteAppApi,
    editAppApi,
    getListAppApi, getListFilterAppApi, getListSearchAppApi,
    getOneAppApi, patchAppApi,
    saveAppApi
} from "../../api/MainApi/MainApi";
import {makeUpperCase} from "../../utils/SecondaryFuncs/StringFuncs";

export const simpleAction = (payload, api, reload = true, list = true) => (dispatch) => {
    dispatch({
        api: chooseAPI(api.type),
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: {api: api.cAPI, payload: payload}
    }).then(res => {
        dispatch({
            type: "updateState",
            payload: {
                attachmentId: null,
                openModal: false
            }
        })
        if (list) {
            dispatch(sendThen(getListAction({api: api.cAPI}), res))
        } else if (list === false) {
            dispatch(sendThen("OK", res))

            if (reload) {
                window.location.reload(false)
            }
        }
    }).catch(() => {
        dispatch(sendCatch())
    })
}


export const getListAction = (payload) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getListAppApi,
        types: [
            types.REQUEST_START,
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        if (res.payload.success) {
            let obj = {}
            obj[`${payload.api}List`] = res.payload.object

            dispatch({
                type: "updateState",
                payload: obj,
            })
        }
    }).catch(err => console.log(err))
}

export const getListSearchAction = (payload) => (dispatch) => {
    dispatch({
        api: getListSearchAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SEARCH_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}


export const getListFilterAction = (payload) => (dispatch) => {
    dispatch({
        api: getListFilterAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(payload['name'])}_SEARCH_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: payload
    })
}


export const getOneAction = (data) => (dispatch) => {
    dispatch({
        type: "updateState",
        payload: {
            attachmentId: null
        }
    })
    dispatch({
        api: getOneAppApi,
        types: [
            types.REQUEST_START,
            types[`REQUEST_GET_${makeUpperCase(data.api)}_ONE_SUCCESS`],
            types.REQUEST_ERROR
        ],
        data: data
    })
}

export const getItemListByItemAction = (payload, api, type, state, secondElement) => (dispatch) => {
    dispatch({
        api: api,
        types: [
            types.REQUEST_START,
            types[type],
            types.REQUEST_ERROR
        ],
        data: payload
    }).then(res => {
        changeStateArray(state, secondElement, res.payload.object)
    }).catch(err => err)

}


const chooseAPI = (name) => {
    switch (name) {
        case "delete" :
            return deleteAppApi
        case "save" :
            return saveAppApi
        case "edit" :
            return editAppApi
        case "patch" :
            return patchAppApi
        default :
            break;
    }
}


