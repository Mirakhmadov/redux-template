import moment from "moment";

export const getNumberLLL = (number) => {
    return new Intl.NumberFormat().format(number)
}
