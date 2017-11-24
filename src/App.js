import React from 'react';
import Posts from './components/posts'
import Categories from './components/categories'
import SortPosts from './components/sortposts'
import NewPost from './components/newPost'

function App() {
  return (
    <div>
      Categories: <Categories />
      Order Posts: <SortPosts />
      Posts: <Posts />

      <NewPost />
    </div>
  )
}

export default App;
