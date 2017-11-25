import React from 'react';
import Header from './components/header'
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'
import { Link } from 'react-router'

function App() {
  return (
    <div className="header">
      <Link to={"/posts/new"}>Create an new post</Link>
      <hr />
      <Header />
      Categories: <Categories />
      Order Posts: <SortPosts />
      Posts: <Posts />
    </div>
  )
}

export default App;
