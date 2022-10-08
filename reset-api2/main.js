const userform = document.getElementById('user-form')
const API_URL = "http://localhost:3000";



const userTemplate = (post) => {
  const html = (
    `
<div class="post" id='post-${post.id}'>
<h2>${post.title}</h2>
<p>${post.body}</p>
<button class='edit-btn' data-post-id=${post.id}>Edit Post</button>
<button class='del-btn' data-post-id=${post.id}>Delete Post</button>
 </div>
`
  )
  document.body.insertAdjacentHTML("beforeEnd", html)
  const editBtn = document.querySelector(`#post-${post.id}`).querySelector(`.edit-btn`)
  const delBtn = document.querySelector(`#post-${post.id}`).querySelector(`.del-btn`)
  editBtn.addEventListener("click", (e)=>{
    let title = e.target.parentNode.firstElementChild.innerText
    let body = e.target.parentNode.children[1].innerText
    userform.title.value = title
    userform.body.value = body
    userform.insertAdjacentHTML('afterBegin', "<input type='hidden' name='method' value='put'/>")
    userform.insertAdjacentHTML('afterBegin', `<input type='hidden' name='id' value="${post.id}" />`)
  })
  delBtn.addEventListener("click",(e)=>{
    fetch (`${API_URL}/posts/${post.id}`,{
      method: "DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(response => alert(`${post.id} has been deleted post`))
  })
}


userform.addEventListener("submit", (e) => {
  e.preventDefault()

  // form value

  const title = e.target.title.value
  const body = e.target.body.value
  const id = e.target.id.value
  const method = e.target.method.value

  console.log(id)
  console.log(method)

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

  // updateData
  function updateData(){
    if(id && method === 'put'){
      fetch(`${API_URL}/posts/${id}` , {
        method:"PATCH",
        headers:{
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({title , body})
      }).then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => userTemplate(data))
      return alert("not equal")
    }
  }
  updateData()
  
})



// getData
function getData() {
  fetch(`${API_URL}/posts`)
   .then(response => response.json())
   .then(data => data.forEach(post => {
     userTemplate(post)
   }))
}
getData()
