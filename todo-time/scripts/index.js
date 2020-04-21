'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
}

renderHistory(todos, filters)

document.querySelector('#searchTodo').addEventListener('submit', (e) => {
    filters.searchText = e.target.value
    
    if ( e.target.value.length > 0) {
        toggleViews()
        
    }
})

// document.querySelector('#new-todo').addEventListener('submit', (e) => {
//     const todoId = uuidv4()
//     const timestamp = moemnt().valueOf()
//     const todoTitle = document.querySelector('#titleText').value
//     const todoBody = formElement.bodyText.value.trim()
//     console.log(todoTitle)
//     console.log('click')
//     //e.preventDefault()
    
//     todos.push({
//         id: todoId,
//         title: todoTitle,
//         body: todoBody,
//         createdAt: timestamp,
//         updateAt: timestamp,
//     })
//     saveTodo(todos)
//     renderHistory(todos, filters)
//     formElement.titleText.value = ''
//     formElement.bodyText.value = ''
    

// })

document.querySelector('#create').addEventListener('click', (e) =>{
    const todoId = uuidv4()
    const timestamp = moment().valueOf()
    const todoTitle = document.querySelector('#titleText').value
    const todoBody = document.querySelector('#bodyText').value
    console.log(todoTitle)
    //e.preventDefault()
    if( todoTitle.trim().length > 0) {
        todos.push({
            id: todoId,
            title: todoTitle,
            body: todoBody,
            createdAt: timestamp,
            updateAt: timestamp,
        })
        renderHistory(todos, filters)
        saveTodo(todos)
    }
})


// window.addEventListener('storage', (e) => {
//     if (e.key === 'todos') {
//         todos = JSON.parse(e.newValue)

//         renderHistory(todos, filters)
//     }
// })