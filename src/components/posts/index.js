import React from 'react'
import { connect } from 'react-redux'
import { getPosts, votePost } from '../../actions/posts'
import Vote from '../../fragments/vote'

class Posts extends React.Component {

    constructor(props) {
        super(props)
    }

    componentShouldUpdate() {
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
            return <Post {...post} index={index} onClick={this.props.vote} />
        })

        return <ul>{renderPosts}</ul>
    }
}

function Post({ title, body, author, timestamp, voteScore, index, onClick}) {
    return (
        <li>
            <h2>{title}</h2>
            <p>{body}</p>
            <span>Published on <FormattedDate timestamp={timestamp} /> by { author } - {voteScore} Votes</span>
            <Vote post={index} onClick={onClick} />
        </li>
    )
}

function FormattedDate({ timestamp }) {
    return <span>{timestamp}</span>
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts.items,
        sortOn: state.posts.sorting,
        selectedCategory: state.categories.selected
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
      getPosts: () => dispatch(getPosts()),
      vote: (post, vote) => dispatch(votePost(post, vote))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)