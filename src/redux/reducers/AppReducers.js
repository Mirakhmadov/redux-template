import * as types from "../actionTypes/AppActionTypes";
import {createReducer} from "../../utils/MainUtils/StoreUtils";


const initState = {
    attachmentUrl : 'http://localhost:9000/api/attachment/',
    attachmentId: '',
    page : 1,
    size : 10,
    filterDate : '',
    totalElements : 0,
    totalPages : 0,
    attachments : [],
    loading: false,
    viewImage : '',
    viewImageModal : false,
    inputs : [],

    openModal: false,
    deleteModal: false,
    statusModal: false,

    currentItem: '',
    currentObject : {},



    courseList : [],
    teacherList : [],
};

const reducers = {
    [types.REQUEST_START](state) {
        state.loading = true;
    },


    [types.REQUEST_ERROR](state) {
        state.loading = false;
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};
export default createReducer(initState, reducers);
