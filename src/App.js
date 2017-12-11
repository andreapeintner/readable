import React from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'

function App() {
  return (
    <div>
      <div className="header">
        <Header />
        <hr />
      </div>
      <div className="main">
        <div className="select_sort">
          <Categories />
          <SortPosts />
        </div>
        <Posts />
      </div>
    </div>
  )
}

export default App;
