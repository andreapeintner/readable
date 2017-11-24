import { fetchCategories } from '../helpers/api'

const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES'
const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'
const SELECTED_CATEGORY = 'SELECTED_CATEGORY'
const CLEAR_CATEGORY = 'CLEAR_CATEGORY'

function fetchingCategories() {
    return {
        type: FETCHING_CATEGORIES
    }
}

export function clearCategory() {
    return {
        type: CLEAR_CATEGORY
    }
}

export function recievedCategories(categories) {
    return {
        type: RECIEVED_CATEGORIES,
        categories
    }
}

export function selectedCategory(category) {
    return {
        type: SELECTED_CATEGORY,
        category
    }
}

export function getCategories() {
    return function (dispatch) {
        dispatch(fetchingCategories())
        fetchCategories().then(({ categories }) => {
            return dispatch(recievedCategories(categories))
        }).catch((err) => {
            console.error(err)
        })
    }
}