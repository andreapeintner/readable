import { fetchPosts, savePostToApi, removePost } from '../helpers/api'

const FETCHING_POSTS = 'FETCHING_POSTS'
const RECIEVED_POSTS = 'RECIEVED_POSTS'
const SORT_POSTS = 'SORT_POSTS'
const VOTE_POST = 'VOTE_POST'
const SAVED_POST = 'SAVED_POST'
const DELETED_POST = 'DELETED_POST'

function fetchingPosts() {
    return {
        type: FETCHING_POSTS
    }
}

function savedPost(post) {
    return {
        type: SAVED_POST,
        post
    }
}


function deletedPost(id) {
    return {
        type: DELETED_POST,
        id
    }
}


export function recievedPosts(posts) {
    return {
        type: RECIEVED_POSTS,
        posts
    }
}

export function votePost(post, vote) {
    return {
        type: VOTE_POST,
        post,
        vote
    }
}

export function getPosts() {
    return function (dispatch) {
        dispatch(fetchingPosts())
        fetchPosts().then(( posts ) => {
            return dispatch(recievedPosts(posts))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function deletePost(id) {
    return function (dispatch) {
        removePost(id).then((post) => {
            return dispatch(deletedPost(post.id))
        }).catch((err) => {
            console.error(err)
        })
    }
}    

export function savePost(post) {
    return function (dispatch) {
        savePostToApi(post).then((post) => {
            return dispatch(savedPost(post))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function changeSortOn(sorting) {
    return {
        type: SORT_POSTS,
        sorting
    }
}
