import update from 'immutability-helper';

const FETCHING_POSTS = 'FETCHING_POSTS'
const RECIEVED_POSTS = 'RECIEVED_POSTS'
const SORT_POSTS = 'SORT_POSTS'
const VOTE_POST = 'VOTE_POST'
const SAVED_POST = 'SAVED_POST'
const DELETED_POST = 'DELETED_POST'

const initialState = {
    fetching: false,
    sorting: 'voteScore',
    items: []
}

export default function reducer(state = initialState, action) {
    console.log(action.type);
    switch(action.type) {
        case FETCHING_POSTS:
            return { ...state, fetching: true }
        case RECIEVED_POSTS:
            const postObject = action.posts.reduce((acc, curr) => {
                acc[curr.id] = curr
                return acc
            }, {})
            return { ...state, items: postObject, fetching: false }
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
            const posts = {...state.items}
            posts[action.post.id] = action.post
            return { ...state, items: posts }
        case DELETED_POST:
            const { [action.id]: u, ...rest } = state.items
            return { ...state, items: rest }
        default:
            return state
    }
}
