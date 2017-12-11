import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { editComment, getCommentsForPost } from '../../actions/comments'

class EditComment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: props.commentId,
            body: this.props.comment ? this.props.comment.body : null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            body: nextProps.comment ? nextProps.comment.body : null
        })
    }

    onComponentDidMount() {
        this.props.getCommentsForPost(this.props.postId)
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }    

    handleChange(key, value) {
        var obj = {...this.state}
        obj[key] = value
        this.setState(obj)
    }

    submit() {
        this.props.submit(this.state)
    }

    render() {
        return (
            <div className="add-post">
                <h3>Tell us something</h3>
                <Link to={`/posts/${this.props.postId}`}>Go back</Link>
                <form>
                    <Textarea value={this.state.body} name="body" handleChange={this.handleChange} />
                    <button onClick={(e) => {
                        e.preventDefault()
                        this.submit()
                    }
                    }>Save</button>
                </form>
            </div>
        )
    }
}

function Textarea({value, name, handleChange }) {
    return (
        <div>
            <span>{name}:</span>
            <textarea onChange={(e) => handleChange(name, e.target.value)}>{value}</textarea>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(Object.values(state.comments.items))
    console.log(ownProps.params.commentId)
    const editComment = Object.values(state.comments.items).filter((comment) => {
        console.log(comment)
        console.log(comment.id === ownProps.params.commentId)
        return comment.id === ownProps.params.commentId
    })
    
    return {
        comment: editComment.shift(),
        categories: state.categories.items,
        postId: ownProps.params.postId,
        commentId: ownProps.params.commentId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (comment) => dispatch(editComment(comment)),
        getCommentsForPost: (id) => dispatch(getCommentsForPost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)
