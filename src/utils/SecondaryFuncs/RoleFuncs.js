import programmer from "./../../resources/images/programmer.jpg"
import client from "./../../resources/images/client.png"
import cashier from "./../../resources/images/cashier.jpg"
import worker from "./../../resources/images/worker.jpg"
import director from "./../../resources/images/director.png"
import moderator from "./../../resources/images/moderator.png"
import operator from "./../../resources/images/operator.jpg"
import store from "../../redux";


const {auth: {currentUser}} = store.getState()


export const nameRole = () => {
    const {auth: {currentUser}} = store.getState()
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    switch (roleName) {
        case "SUPER_ADMIN" :
            return "Dasturchi ";

        case "ADMIN" :
            return "Boshliq ";

        case "ACCOUNTANT" :
            return "Hisobchi ";

        case "CASHIER" :
            return "G'aznachi ";

        case "SELLER" :
            return "Oyna sotuvchi ";

        case "OPERATOR" :
            return "Operator ";

        case "AC_SELLER" :
            return "Aksessuar sotuvchi ";

        case "CAR_SERVICE" :
            return "Mashina xizmati ";

        case "WORKER" :
            return "Ishchi ";

        case "CLIENT" :
            return "Mijoz ";

        default :
            return "Noaniq";
    }
}

export const routeRole = () => {
    const {auth: {currentUser}} = store.getState()
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    return roleName.toLowerCase()

}



export const imageRole = () => {
    const {auth: {currentUser}} = store.getState()
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''

    switch (roleName) {
        case "DEVELOPER" :
            return programmer;

        case "ADMIN" :
            return director;

        default :
            return null;
    }
}


export const orderDeveloper = () => {
    let roleName = currentUser && currentUser.role && currentUser.role.roleName ? currentUser.role.roleName : ''
    if (roleName === "DEVELOPER") {
        return true;
    }
}