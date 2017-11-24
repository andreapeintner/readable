const FETCHING_POSTS = 'FETCHING_POSTS'
const RECIEVED_POSTS = 'RECIEVED_POSTS'

const FETCHING_CATEGORIES = 'FETCHING_CATEGORIES'
const RECIEVED_CATEGORIES = 'RECIEVED_CATEGORIES'

export default function reducer(state, action) {
    switch(action.type) {
        case FETCHING_POSTS:
            return { ...state, posts: { items: state.posts.items, fetching: true }}
        case RECIEVED_POSTS:
            return { ...state, posts: { items: action.posts, fetching: false }}
        case FETCHING_CATEGORIES:
        return { ...state, categories: { items: state.categories.items, fetching: true }}
        case RECIEVED_CATEGORIES:
        return { ...state, categories: { items: action.categories, fetching: false }}
        default:
            return state
    }
}