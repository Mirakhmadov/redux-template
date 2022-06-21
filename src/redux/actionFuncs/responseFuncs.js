import {toast} from "react-toastify";

export const sendThen = (fun,res) => (dispatch) => {
    if (res.statusCode === 200){
        toast.error(res.payload.message)
    }else {
        if (fun !== null && fun !== "OK"){
            dispatch(fun)
        }
        dispatch({
            type: "updateState",
            payload: {
                currentObject : null,
                openModal: false,
                deleteModal:false,
                currentItem:null
            }
        })
        if (res && res.payload && res.payload.message){
            toast.success(res.payload.message);
        }
    }
}

export const sendCatch = () => (dispatch) => {
    toast.error("Catch Error!");
}