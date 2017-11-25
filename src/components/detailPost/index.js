import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getPosts } from '../../actions/posts'

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
                <p>{post.title}</p>
            )
        })
        return (
            <div>
                <Link to="/">Go back</Link>
                {detailPost}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const post = state.posts.items.filter((post) => {
        return post.id === ownProps.params.id
    })
    return {
        post: post
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
      getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost)