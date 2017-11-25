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
            <div className="add-post">
                <h3>Add post</h3>
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


