import { saveCommentToApi, fetchComments, deleteComment, voteCommentInApi, saveEditedCommentToApi } from '../helpers/api'

const VOTED_COMMENT = 'VOTED_COMMENT'
const SAVED_COMMENT = 'SAVED_COMMENT'
const RECIEVED_COMMENTS = 'RECIEVED_COMMENTS'
const DELETED_COMMENT = 'DELETED_COMMENT'
const EDITED_COMMENT = 'EDITED_COMMENT'

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

function editedComment(comment) {
    return {
        type: EDITED_COMMENT,
        comment
    }
}

export function votedComment(comment, vote) {
    return {
        type: VOTED_COMMENT,
        comment,
        vote
    }
}

export function voteComment(id, vote) {
    return function (dispatch) {
        voteCommentInApi(id, vote).then((comment) => {
            return dispatch(votedComment(id, vote))
        }).catch((err) => {
            console.error(err)
        })
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

export function editComment(comment) {
    return function (dispatch) {
        saveEditedCommentToApi(comment).then((comment) => {
            return dispatch(editedComment(comment))
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
