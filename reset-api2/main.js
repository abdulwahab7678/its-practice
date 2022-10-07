const userform = document.getElementById('user-form')
const API_URL = "http://localhost:3000";

const userTemplate = (post) => {
  const html = (
    `
<div class="user" id='user-${post.id}'>
<h2>${post.title}</h2>
<p>${post.body}</p>
<button class='edit-btn' data-user-id=${post.id}>Edit Post</button>
<button class='delete-btn' data-user-id=${post.id}>Delete Post</button>
 </div>
`
  )
  document.body.insertAdjacentHTML("beforeEnd", html)
}
// getData
function getData() {
  fetch(`${API_URL}/posts`)
    .then(response => response.json())
    .then(data => data.forEach(post => {
      userTemplate(post)
    }))
}
getData()


userform.addEventListener("submit", (e) => {
  e.preventDefault()

  // form value

  const title = e.target.title.value
  const body = e.target.body.value
  const id = e.target.id.value
  const method = e.target.method.value

  // postData
  function postData() {
    fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, body})
    })
      .then(response => response.json())
      .then(data => userTemplate(data))
  }
  postData()
})



