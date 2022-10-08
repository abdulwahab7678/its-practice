// FETCH

// const userTemplate = (user) => {
//   const userHTML = `
//     <div class='user'>
//       <h3>${user.name}</h3>
//       <p>${user.username}</p>
//       <p>${user.email}</p>
//     </div>
//   `
//   document.body.insertAdjacentHTML('beforeend', userHTML)
// }

// fetch('https://jsonplaceholder.typicode.com/users').then(function(response) {
//   return response.json()
// }).then(data => {
//   data.forEach(user => {
//     userTemplate(user)
//   })
// })



// Async JS
// Single-threaded JavaScript
// JIT = Just in time compilation
// Asynchrounous JavaScript = (Browser, System)

// setTimeout(function() {
//   console.log('hello world 2')
// }, 1000)

// setTimeout(function() {
//   console.log('hello world')
// }, 0)

// function sayHello() {
//   console.log('This is from say Hello Function without async')
// }
// sayHello()

// let i = 0
// while ( i < 1000 ) {
//   console.log(i)
//   i+= 1
// }
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()
// sayHello()

// which console we see first?
// 1. this is from say Hello Function without async
// 2. loop
// 3. hello world

// Closure
// function
// function return a function
// return function is enclosed by outer function's scope
// function returningAFunc(num) {
//   let a = num
//   return function saySomething(b) {
//     return a + b
//   }
// }
// var whatValue = returningAFunc(50)
// multiplyBy
// additionBy
// function multiplyBy(num) {
//   return function multiplyByInner(num2) {
//     return num * num2
//   }
// }

// var multiplyBy10 = multiplyBy(10)
// var multiplyBy20 = multiplyBy(20)
// console.log(multiplyBy10(20))
const userForm = document.querySelector("#user-form")
const API_URL = "http://localhost:3000"

userForm.addEventListener('submit', (event) => {
  // prevent form submission
  event.preventDefault()

  // form values
  const name = event.target.name.value
  const email = event.target.email.value
  const id = event.target.id.value
  const method = event.target.method.value


  console.log(id)
  console.log(method)


  // post data to api server
  if ( id && method === 'put') {
    const response = fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email})
    }).then(response => {
      if ( response.ok ) {
        return response.json()
      }
    }).then(data => userTemplate(data))
    return false;
  }

  const response = fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email})
  }).then(response => {
    if ( response.ok ) {
      return response.json()
    }
  }).then(data => userTemplate(data))

})

const userTemplate = (user) => {
  const html = (
    `
      <div class="user" id='user-${user.id}'>
        <h1>${user.name}</h1>
        <p>${user.email}</p>
        <button class='edit-btn' data-user-id=${user.id}>Edit User</button>
        <button class='delete-btn' data-user-id=${user.id}>Delete User</button>
      </div>
    `
  )

  document.body.insertAdjacentHTML("beforeEnd", html)
  const editUserBtn = document.querySelector(`#user-${user.id}`).querySelector('.edit-btn')
  const deleteUserBtn = document.querySelector(`#user-${user.id}`).querySelector('.delete-btn')
  editUserBtn.addEventListener('click', (event) => {
    let userName = event.target.parentNode.firstElementChild.innerText
    let email = event.target.parentNode.children[1].innerText
    userForm.name.value = userName
    userForm.email.value = email
    userForm.insertAdjacentHTML('afterBegin', "<input type='hidden' name='method' value='put' />")
    userForm.insertAdjacentHTML('afterBegin', `<input type='hidden' name='id' value="${user.id}" />`)
  })

  deleteUserBtn.addEventListener('click', (event) => {
    const response = fetch(`${API_URL}/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json"
      }
    }).then(response => alert(`${user.id} has been deleted from database`))
  })
}

const users = fetch(`${API_URL}/users`)
              .then(response => response.json())
              .then(data => data.forEach(user => userTemplate(user)))
