import store from "../../redux";

// let {app: {openModal, deleteModal, viewImageModal}} = store.getState()

export const showHideModal = (item) => (dispatch) => {
    let {app: {openModal}} = store.getState()
    dispatch({
        type: "updateState",
        payload: {
            currentObject: item,
            openModal: !openModal
        }
    })
}

export const showHideDeleteModal = (item) => (dispatch) => {
    let {app: {deleteModal}} = store.getState()
    dispatch({
        type: "updateState",
        payload: {
            currentItem: item,
            deleteModal: !deleteModal
        }
    })
}

export const showHideImgModal = (item) => (dispatch) => {
    let {app: {viewImageModal}} = store.getState()
    dispatch({
        type: "updateState",
        payload: {
            viewImage: item && item.attachment && item.attachment.id ? item.attachment.id : '',
            viewImageModal: !viewImageModal
        }
    })
}
