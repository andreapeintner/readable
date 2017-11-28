import { saveCommentToApi, fetchComments, deleteComment } from '../helpers/api'

const SAVED_COMMENT = 'SAVED_COMMENT'
const RECIEVED_COMMENTS = 'RECIEVED_COMMENTS'
const DELETED_COMMENT = 'DELETED_COMMENT'

function savedComment(comment) {
    return {
        type: SAVED_COMMENT,
        comment
    }
}

export function recievedComments(comments) {
    return {
        type: RECIEVED_COMMENTS,
        comments
    }
}

export function deletedComment(id) {
    return {
        type: DELETED_COMMENT,
        id
    }
}

export function getCommentsForPost(postId) {
    return function (dispatch) {
        fetchComments(postId).then(( comments ) => {
            return dispatch(recievedComments(comments))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function deleteCommentForPost(commentId) {
    return function (dispatch) {
        deleteComment(commentId).then(( comment ) => {
            return dispatch(deletedComment(comment.id))
        }).catch((err) => {
            console.error(err)
        })
    }
}


export function saveComment(comment) {
    return function (dispatch) {
        saveCommentToApi(comment).then((comment) => {
            return dispatch(savedComment(comment))
        }).catch((err) => {
            console.error(err)
        })
    }
}
