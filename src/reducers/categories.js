const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES'
const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'
const SELECTED_CATEGORY = 'SELECTED_CATEGORY'
const CLEAR_CATEGORY = 'CLEAR_CATEGORY'

const initialState = {
    fetching: false,
    selected: null,
    items: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCHING_CATEGORIES:
            return { ...state, fetching: true }
        case RECIEVED_CATEGORIES:
            return { ...state, items: action.categories, fetching: false }
        case SELECTED_CATEGORY:
            return { ...state, selected: action.category }
        case CLEAR_CATEGORY:
            return { ...state, selected: null }
        default:
            return state
    }
}