import React from 'react'
import { connect } from 'react-redux'
import { getPosts, votePost, deletePost } from '../../actions/posts'
import { deleteCommentForPost } from '../../actions/comments'
import { Link } from 'react-router'
import Vote from '../../fragments/vote'
import Moment from 'react-moment'
import Comment from '../comments'
import NotFound from '../notFound'

class Posts extends React.Component {

    constructor(props, context) {
        super(props)
    }

    componentDidMount() {
        this.props.getPosts();
    }
    render() {
          
        const renderPosts = this.props.posts.filter(
            (post) => {
                return this.props.selectedCategory === null ||
                this.props.selectedCategory === post.category
            }).sort((a, b) => {
                return a[this.props.sortOn] <= b[this.props.sortOn] ? 1 : -1
            })
            .map((post, index) => {
            return (
                <div key={index}>
                   <div onClick={() => this.props.deletePost(post.id)}>&times;</div>
                    <Post {...post} index={index} onClick={this.props.vote} key={post.id}/>
                </div>
            )
        })
        return <ul className="post-list">{renderPosts}</ul>
    }
}


function Post({ id, title, body, author, timestamp, voteScore, index, onClick, commentCount, category }) {
    return (
            <div className="post-item">
               <li>
                    <Link to={`/${category}/${id}`}>
                        <h2>{title}</h2>
                    </Link>
                    <p>{body}</p>
                    <div>Published on <FormattedDate timestamp={timestamp} /> </div>
                    <div>by <i>{ author } </i></div><br />
                    <div>({voteScore} Votes)</div>
                    <Vote id={id} onClick={onClick} /><br />
                    <div> Comments: {commentCount}</div>
                    <button className="btn_comment"><Link to={`/${category}/${id}`}>View/Add Comment</Link></button>
                    <button className="btn_edit"><Link to={`/posts/${id}/edit`}>Edit Post</Link></button>
                </li>
            </div>
    )
}

function FormattedDate({ timestamp }) {
    return <span><Moment>{timestamp}</Moment></span>
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: Object.values(state.posts.items),
        sortOn: state.posts.sorting,
        selectedCategory: state.categories.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPosts: () => dispatch(getPosts()),
      vote: (post, vote) => dispatch(votePost(post, vote)),
      deletePost: (id) => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
