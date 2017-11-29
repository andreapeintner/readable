export const API = 'http://localhost:3001'

const headers = { 'headers' : { 'Authorization': 'react_app', 'Content-Type': 'application/json' } }

// **** Posts
// get all
export const fetchPosts = () => {
    return fetch(`${API}/posts`, headers)
      .then(res => res.json())
      .then((json) => json)
}

export const savePostToApi = (post) => {
  const newPost = {...post, id: Math.floor(Math.random()* 1000000).toString(), timestamp: Date.now()}
  return fetch(`${API}/posts/`, {method: 'POST', body: JSON.stringify(post), ...headers}).then(res => res.json())
  .then((json) => json)
}

export const saveEdittedPostToApi = (post) => {
  return fetch(`${API}/posts/${post.id}`, {method: 'PUT', body: JSON.stringify(post), ...headers}).then(res => res.json())
  .then((json) => json)
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

export const deleteComment = (id) => {
  return fetch(`${API}/comments/${id}`, {method: 'DELETE', ...headers})
    .then(res => res.json())
    .then((json) => json)
}

export const voteCommentInApi = (id, vote) => {
  const option = {option: vote ? 'upVote' : 'downVote'}
  return fetch(`${API}/comments/${id}`, {method: 'POST', body: JSON.stringify(option), ...headers})
}

export const fetchComments = (postId) => {
  return fetch(`${API}/posts/${postId}/comments`, headers)
    .then(res => res.json())
    .then((json) => json)
}

export const saveCommentToApi = (comment) => {
  const newComment = {...comment, id: Math.floor(Math.random()* 1000000).toString(), timestamp: Date.now()}
  return fetch(`${API}/comments/`, {method: 'POST', body: JSON.stringify(newComment), ...headers}).then(res => res.json())
  .then((json) => json)
}

export const saveEditedCommentToApi = (comment) => {
  return fetch(`${API}/comments/${comment.id}`, {method: 'PUT', body: JSON.stringify(comment), ...headers}).then(res => res.json())
  .then((json) => json)
}
