import React from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'
import { Link } from 'react-router'

function App() {
  return (
    <div className="header">
      <Header />
      <hr />
      <Link to={"/posts/new"}><div className="new-post"><h3>Create an new post</h3></div></Link>
      <Categories />
      <SortPosts />
      <Posts />
    </div>
  )
}

export default App;
