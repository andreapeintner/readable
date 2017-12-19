import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPosts, votePost, deletePost } from '../../actions/posts'
import NewComment from '../newComment'
import Comments from '../comments'
import NotFound from '../notFound'
import Vote from '../../fragments/vote'

class DetailPost extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getPosts();
    }
    
    render() {

        if(this.props.post.length <= 0) {
            return <NotFound />;
        } 
        
        const detailPost = this.props.post.map((post) => {
                return (
                    <div key={post.id} className="comment-container">
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <p><i>{post.author}</i></p>
                        <div>({post.voteScore} Votes)</div>
                        <Vote id={post.id} onClick={post.onClick} onClick={this.props.vote}/><br />
                        <div> Comments: {post.commentCount}</div>
                        <button className="btn_edit"><Link to={`/posts/${post.id}/edit`}>Edit Post</Link></button>
                        <button onClick={() => this.props.deletePost(post.id)}><Link to={`/`}>Delete Post</Link></button>
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
      getPosts: () => dispatch(getPosts()),
      vote: (post, vote) => dispatch(votePost(post, vote)),
      deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)
