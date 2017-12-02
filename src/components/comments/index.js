import React from 'react'
import { connect } from 'react-redux'
import { getCommentsForPost, voteComment, deleteCommentForPost } from '../../actions/comments'
import Vote from '../../fragments/vote'
import { Link } from 'react-router'

import styles from '../../styles/index.css'

class Comments extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCommentsForPost(this.props.postId)
    }

    render() {
        const renderComments = this.props.comments.map((comment) => <Comment key={comment.id} {...comment} postId={this.props.postId} onClick={this.props.vote} deleteComment={this.props.deleteCommentForPost} />)
        return <div className="comment-container"><h4>Comments:</h4>{renderComments}</div>
    }
}

function Comment({ id, author, body, voteScore, postId, deleteComment, onClick }) {
    return (
        <div className="comment-item">
            <p>{body}</p>
            <span>- <i>{author}</i> ({voteScore} votes)</span>
            <button className="delete-comment" onClick={() => deleteComment(id)}>&times;</button>
            <Vote id={id} onClick={onClick} />
            <Link to={`/posts/${postId}/comment/${id}/edit`}>Edit</Link>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        comments: Object.values(state.comments.items)
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getCommentsForPost: (postId) => dispatch(getCommentsForPost(postId)),
      vote: (comment, vote) => dispatch(voteComment(comment, vote)),
      deleteCommentForPost: (commentId) => dispatch(deleteCommentForPost(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
