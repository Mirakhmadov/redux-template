import HttpClient from "../utils/MainUtils/HttpClient";
import {api} from './api'

export const loginUserAuthApi = (data = {username: null, password: null, newUser:false}) => {
    return HttpClient.doPost(api.login, data);
}

export const meAuthApi = (data = {username: null, password: null}) => {
    return HttpClient.doGet(api.userMe);
}
export const registerAuthApi = (data) => {
    return HttpClient.doPost(api.registerUser, data);
}