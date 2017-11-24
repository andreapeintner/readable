import update from 'immutability-helper';

const FETCHING_POSTS = 'FETCHING_POSTS'
const RECIEVED_POSTS = 'RECIEVED_POSTS'
const SORT_POSTS = 'SORT_POSTS'
const VOTE_POST = 'VOTE_POST'
const SAVED_POST = 'SAVED_POST'

const initialState = {
    fetching: false,
    sorting: 'voteScore',
    items: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCHING_POSTS:
            return { ...state, fetching: true }
        case RECIEVED_POSTS:
            return { ...state, items: action.posts, fetching: false }
        case SORT_POSTS:
            return { ...state, sorting: action.sorting }
        case VOTE_POST:
            return update(state, { 
                items: { 
                [action.post]: {
                    voteScore: {$apply: function(x) {return x + action.vote}}
                }
                }
            });
        case SAVED_POST:
            return { ...state, items: [...state.items, action.post] }
        default:
            return state
    }
}