import React from 'react'
import { connect } from 'react-redux'
import { getCategories, selectedCategory, clearCategory } from '../../actions/categories'


class Categories extends React.Component {

    constructor(props) {
        super(props)
        this.selectCategory = this.selectCategory.bind(this)
    }

    componentDidMount() {
        this.props.getCategories()
    }

    selectCategory(category) {
        this.props.selectCategory(category)
    }

    render() {
        const clearSelected = this.props.selectedCategory ? <ClearSelected onClick={this.props.clearCategory} /> : null
        const renderCategories = this.props.categories.map((category) => {
            return <Category key={category.name} {...category} onClick={this.selectCategory} selected={this.props.selectedCategory === category.name} />
        })
        return <ul className="category-list">{renderCategories}{clearSelected}</ul>
    }
}

function Category({ name, url, onClick, selected }) {
    const styling = selected ? { backgroundColor: '#dadada', color: '#06405b' } : {} 
    return <li className="categories"><button className="category-button" style={styling} onClick={() => onClick(name)}>{name}</button></li>
}

function ClearSelected({ onClick }) {
    return (
        <li className="categories"><button onClick={() => {onClick()}}>Show all</button></li>
    )
}

const mapStateToProps = state => ({
    categories: state.categories.items,
    selectedCategory: state.categories.selected
})

const mapDispatchToProps = dispatch => {
    return {
      getCategories: () => dispatch(getCategories()),
      selectCategory: (category) => dispatch(selectedCategory(category)),
      clearCategory: () => dispatch(clearCategory())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
