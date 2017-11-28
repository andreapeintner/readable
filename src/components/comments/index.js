import React from 'react'
import { connect } from 'react-redux'
import { getCommentsForPost, deleteCommentForPost } from '../../actions/comments'

class Comments extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCommentsForPost(this.props.postId)
    }

    render() {
        const renderComments = this.props.comments.map((comment) => <Comment {...comment} deleteComment={this.props.deleteCommentForPost} />)
        return <div>{renderComments}</div>
    }
}

function Comment({ id, author, body, deleteComment }) {
    return (
        <div>
            <p>{body}</p>
            <span>{author}</span>
            <button onClick={() => deleteComment(id)}>&times;</button>
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
      deleteCommentForPost: (commentId) => dispatch(deleteCommentForPost(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
