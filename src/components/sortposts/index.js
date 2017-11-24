import React from 'react'
import { connect } from 'react-redux'
import { changeSortOn } from '../../actions/posts'

function SortPosts({ changeSortOn, sortOn }) {
    const availableSortKeys = ['voteScore', 'timestamp']
    const renderSortKeys = availableSortKeys.map((sortKey) => {
        const styling = sortOn === sortKey ? { color: 'orange' } : {} 
        return <li onClick={() => changeSortOn(sortKey)} style={styling}>{sortKey}</li>
    })
    return <ul>{renderSortKeys}</ul>
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