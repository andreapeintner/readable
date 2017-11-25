import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { savePost } from '../../actions/posts'

class NewPost extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
            author: null,
            category: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, value) {
        var obj = {}
        obj[key] = value
        this.setState(obj)
    }

    submit() {
        this.props.submit(this.state)
    }

    render() {
        return (
            <div>
                <Link to="/">Go back</Link>
                <form>
                    <Input type="text" value={this.state.title} name="title" handleChange={this.handleChange} />
                    <Input type="text" value={this.state.author} name="author" handleChange={this.handleChange} />
                    <Textarea value={this.state.body} name="body" handleChange={this.handleChange} />
                    <Select value={this.state.category} name="category" handleChange={this.handleChange} items={this.props.categories} />
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
            <textarea onChange={(e) => handleChange(name, e.target.value)}>{value}</textarea>
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
    return {
        categories: state.categories.items
    }
}
    
const mapDispatchToProps = dispatch => {
    return {
        submit: (post) => dispatch(savePost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)