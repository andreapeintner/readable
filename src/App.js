import React from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'
import { Link } from 'react-router'

function App() {
  return (
    <div>
      <div className="header">
        <Header />
        <hr />
        {/* <Link to={"/posts/new"}><div className="new-post"><h3>Create an new post</h3></div></Link> */}
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
