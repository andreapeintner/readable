import React from 'react';
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'
import { Link } from 'react-router'

function App() {
  return (
    <div>
      <Link to={"/posts/new"}>Create an new post</Link>
      <hr />
      Categories: <Categories />
      Order Posts: <SortPosts />
      Posts: <Posts />
    </div>
  )
}

export default App;
