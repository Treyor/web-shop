import { createNewCategory, renameItem } from "../../reducers/productsReducer"

const url = 'http://localhost:3001/categories'

export const addNewCategory = (data) => {
    return async dispatch => {
    await fetch(`${url}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((data) => data.json())
    .then((res) => dispatch(createNewCategory(res)))
}
}

export const changeCategoryTitle = (category, title) => {
    return async dispatch => {
    await fetch(`${url}/${category.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title})
    })
    .then((data) => data.json())
    .then((res) => dispatch(renameItem({...res, title})))
}
}