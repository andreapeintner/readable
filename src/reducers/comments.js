import update from 'immutability-helper';

const FETCHING_COMMENTS = 'FETCHING_COMMENTS'
const RECIEVED_COMMENTS = 'RECIEVED_COMMENTS'
const SAVED_COMMENT = 'SAVED_COMMENT'
const DELETED_COMMENT = 'DELETED_COMMENT'

const initialState = {
    fetching: false,
    items: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCHING_COMMENTS:
            return { ...state, fetching: true }
        case RECIEVED_COMMENTS:
            const commentObject = action.comments.reduce((acc, curr) => {
                acc[curr.id] = curr
                return acc
            }, {})
            return { ...state, items: commentObject, fetching: false }
        case SAVED_COMMENT:
            const comments = {...state.items}
            comments[action.comment.id] = action.comment
            return { ...state, items: comments }
        case DELETED_COMMENT:
            const { [action.id]: u, ...rest } = state.items
            return { ...state, items: rest }
        default:
            return state
    }
}
