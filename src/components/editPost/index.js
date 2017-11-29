import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { editPost, getPosts } from '../../actions/posts'

class EditPost extends React.Component {

    constructor(props) {
        super(props)
        console.log(this.props, 'console')
        this.state = {
            id: this.props.postId,
            title: this.props.post ? this.props.post.title : null, 
            body: this.props.post ? this.props.post.body : null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            title: nextProps.post ? nextProps.post.title : null, 
            body: nextProps.post ? nextProps.post.body : null
        })
    }

    componentDidMount() {
        this.props.getPosts();
    }

    handleChange(key, value) {
        var obj = {}
        obj[key] = value
        this.setState(obj)
    }

    submit() {
        this.props.submit(this.state)
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }    

    render() {
        return (
            <div className="add-post">
                <h3>Edit post</h3>
                <Link to={`/posts/${this.props.postId}`}>Go back</Link>
                <form>
                    <Input type="text" value={this.state.title} name="title" handleChange={this.handleChange} />
                    <Textarea value={this.state.body} name="body" handleChange={this.handleChange} />
                    <button onClick={(e) => {
                        e.preventDefault()
                        this.submit()
                    }
                    }>Update</button>
                </form>
            </div>
        )
    }
}

function Input({ type, value, name, handleChange }) {
    return (
        <div>
            <span>{name}:</span>
            <input type={type} value={value} onChange={(e) => handleChange(name, e.target.value)} />
        </div>
    )
}

function Textarea({value, name, handleChange }) {
    return (
        <div>
            <span>{name}:</span>
            <textarea value={value} onChange={(e) => handleChange(name, e.target.value)}>{value}</textarea>
        </div>
    )
}
function Select({value, name, items, handleChange }) {
    const renderOptions = items.map((item) => {
        return <option value={item.name}>{item.name}</option>
    })
    return (
        <div>
            <span>{name}:</span>
            <select onChange={(e) => handleChange(name, e.target.value)}>{renderOptions}</select>
        </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    const post = Object.values(state.posts.items).filter((post) => {
        return post.id === ownProps.params.id
    })
    
    return {
        post: post.shift(),
        categories: state.categories.items,
        postId: ownProps.params.id
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
        submit: (post) => dispatch(editPost(post)),
        getPosts: () => dispatch(getPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
