import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPosts } from '../../actions/posts'
import NewComment from '../newComment'
import Comments from '../comments'

class DetailPost extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const detailPost = this.props.post.map((post) => {
            return (
                <div key={post.id} className="comment-container">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p><i>{post.author}</i></p>
                </div>
            )
        })
        return (
            <div className="add-post">
                <h3>Post Detail</h3>
                <Link to="/">Go back</Link>
                <div className="comment-item">
                    {detailPost}
                </div>
                <div>
                    <Comments postId={this.props.postId} />
                    <NewComment postId={this.props.postId} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const post = Object.values(state.posts.items).filter((post) => {
        return post.id === ownProps.params.id
    })
    return {
        post: post,
        postId: ownProps.params.id
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
      getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)
