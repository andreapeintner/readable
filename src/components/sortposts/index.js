import React from 'react'
import { connect } from 'react-redux'
import { changeSortOn } from '../../actions/posts'

function SortPosts({ changeSortOn, sortOn }) {
    const availableSortKeys = ['voteScore', 'timestamp']
    const renderSortKeys = availableSortKeys.map((sortKey) => {
        const styling = sortOn === sortKey ? { color: 'orange' } : {} 
        return <li key={sortKey} className="sort-items" onClick={() => changeSortOn(sortKey)} style={styling}>{sortKey}</li>
    })
    return <ul className="sort-list">Sort by: {renderSortKeys}</ul>
}

const mapStateToProps = state => ({
    sortOn: state.posts.sorting,
})

const mapDispatchToProps = dispatch => {
    return {
      changeSortOn: (key) => dispatch(changeSortOn(key))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SortPosts)
