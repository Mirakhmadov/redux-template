export const getListItemFunc = (object, arr) => {
    let listItem = ""

    for (let i = 0; i < arr.length; i++) {
        if (object[arr[i]]){
            listItem = object = object[arr[i]] ?? null
        }
    }
    return listItem
}