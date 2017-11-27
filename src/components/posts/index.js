import React from 'react'
import { connect } from 'react-redux'
import { getPosts, votePost, deletePost } from '../../actions/posts'
import { Link } from 'react-router'
import Vote from '../../fragments/vote'
import { removePost } from '../../helpers/api'

class Posts extends React.Component {

    constructor(props, context) {
        super(props)
    }

    shouldComponentUpdate() {
        return true
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
            return <div><DeletePost {...post}/><Link to={`/posts/${post.id}`}><Post {...post} index={index} onClick={this.props.vote} key={post.id}/></Link></div>
        })

        return <ul className="post-list">{renderPosts}</ul>
    }
}


function Post({ id, title, body, author, timestamp, voteScore, index, onClick}) {
    return (
            <div className="post-item">
                <li key={id}>
                    <h2>{title}</h2>
                    <p>{body}</p>
                    <span>Published on <FormattedDate timestamp={timestamp} /> by { author } - {voteScore} Votes</span>
                    <Vote post={index} onClick={onClick} />
                </li>
            </div>
    )
}

function FormattedDate({ timestamp }) {
    return <span>{timestamp}</span>
}

function DeletePost(post) {
    return <div><button onClick={() => {removePost(post.id)}}>X</button></div>
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.items,
        sortOn: state.posts.sorting,
        selectedCategory: state.categories.selected,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPosts: () => dispatch(getPosts()),
      vote: (post, vote) => dispatch(votePost(post, vote)),
      deletedPost: () => dispatch(deletedPost())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
