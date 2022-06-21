import HttpClient from "../utils/MainUtils/HttpClient";
import {api} from './api'

// Attachment CRUD Start
export const uploadFileAppApi = (data) => {
    return HttpClient.doPost(api.addAttachment, data);
};

// export const deleteFileAppApi = (data) => {
//     return HttpClient.doPost("");
// }
// Attachment CRUD End

// export const getSocialEnumAppApi = (data) => {
//     return HttpClient.doGet(api.secondary + "/social" );
// };



export const acceptAppApi = (data) => {
    return HttpClient.doGet(`${api[data.api]}/${data.id}` );
};



