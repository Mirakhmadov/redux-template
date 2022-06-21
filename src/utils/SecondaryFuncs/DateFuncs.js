import moment from "moment";

export const getDateLLL = (date) => {
    return moment(date).format('DD-MM-YYYY, HH:mm')
}

export const getMonthLLL = (date) => {
    return moment(date).format('YYYY-MM')
}