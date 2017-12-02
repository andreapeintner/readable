import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { saveComment } from '../../actions/comments'

class NewComment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            parentId: props.postId,
            body: null,
            author: null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(key, value) {
        console.log(this.state)
        var obj = {...this.state}
        obj[key] = value
        this.setState(obj)
    }

    submit() {
        this.props.submit(this.state)
        browserHistory.push('/')
    }

    render() {
        return (
            <div className="add-post">
                <h3>Tell us something</h3>
                <form>
                    <Textarea value={this.state.body} name="body" handleChange={this.handleChange} />
                    <Input type="text" value={this.state.author} name="author" handleChange={this.handleChange} />
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

const mapDispatchToProps = dispatch => {
    return {
        submit: (comment) => dispatch(saveComment(comment))
    }
}

export default connect(() => {}, mapDispatchToProps)(NewComment)
