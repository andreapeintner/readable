export const API = 'http://localhost:3001'

const headers = { 'headers' : { 'Authorization': 'react_app' } }

// **** Posts
// get all
export const fetchPosts = () => {
    return fetch(`${API}/posts`, headers)
      .then(res => res.json())
      .then((json) => json)
}

export const savePostToApi = (post) => {
  const newPost = {...post, id: Math.floor(Math.random()* 1000000).toString(), voteScore: 1, timestamp: Date.now()}
  return Promise.resolve(newPost)
}

export const fetchCategories = () => {
  return fetch(`${API}/categories`, headers)
    .then(res => res.json())
    .then((json) => json)
}

export const removePost = (id) => {
  return fetch(`${API}/posts/${id}`, {method: 'DELETE', ...headers})
    .then(res => res.json())
    .then((json) => json)
}
