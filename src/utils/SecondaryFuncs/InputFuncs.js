import {v4 as uuidv4} from "uuid";
import {
    getListAction,
    getListFilterAction,
    getListSearchAction
} from "../../redux/actionFuncs/mainActions";
import {toast} from "react-toastify";


export const addInputAction = (array) => {
    array.push({id : uuidv4()})
    return array;
}

export const editInputAction = (array,value,index) => {
    let newArray = []
}

export const deleteInputAction = () => {

}


export const searchListFun = (e,name) => (dispatch) =>{
    if (e.target.value !== "") {
        dispatch(getListSearchAction({name : name, searchValue : e.target.value}))
    }else {
        dispatch(getListAction({api: name}))
    }
}

export const getListFilterFun = (e,v,name) => (dispatch) =>{
    if (v.startDate !== "" && v.endDate !== ""){
        dispatch(getListFilterAction({name : name, payload : v}))
    }else {
        toast.error("Sanalar to'liq kiritilmagan")
    }
}

