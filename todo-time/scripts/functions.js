const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}


const getSaveRecords = () => {
    const recordsJSON = localStorage.getItem('records')
    try {
        return recordsJSON ? JSON.parse(recordsJSON) : []
    } catch (e) {
        return []
    }
}


const saveTodo = (todos) => [
    localStorage.setItem('todos', JSON.stringify(todos))
]


const saveRecord = (records) => {
    localStorage.setItem('records', JSON.stringify(records))
}


const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    })
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}


const toggleViews = () => {
    const createTodoEl = document.querySelector('#defaultContent1').classList
    const histTodoEl = document.querySelector('#defaultContent2').classList
    const listTodoEl = document.querySelector('#toggle-display').classList

    if (listTodoEl.classList.contains('display-switch')) {
        createTodoEl.add('display-switch')
        histTodoEl.add('display-switch')
        listTodoEl.remove('display-switch')
        renderTodos(todos, filters)
    } else {
        renderTodos(todos, filters)
    }
}

const generateTodoDOM = (todo) => {
    const mainEl = document.createElement('a')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('div')
    const createDateText = document.createElement('span')
    
    // Setup todo text
    if (todo.title.length > 0) {
        todoText.textContent = todo.title
    } else {
        todoText.textContent = 'Unnamed todo'
    }
    todoText.classList.add('history-todo-text')
    containerEl.appendChild(todoText)


    createDateText.textContent = 'Created at : ' + moment(todo.createdAt).fromNow()
    createDateText.classList.add('history-date-text')
    containerEl.appendChild(createDateText)


    mainEl.setAttribute('href', `/detail.html#${todo.id}`)
    mainEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    mainEl.appendChild(containerEl)
    
    return mainEl
}

const renderTodos = (todos, filters) => {
    const mainEl = document.querySelector('#search-result-todos')
    let filteredTodo = todos.filter((todo) => {
        const searchTextMatch = todo.title.toLowerCase().includes(filters.searchText.toLowerCase())
        return searchTextMatch
    })

    mainEl.innerHTML = ''
    
    if(filteredTodo.length > 0) {
        filteredTodo.forEach((todo) => {
            mainEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No todo to show'
        mainEl.appendChild(emptyMessage)
    }

    return mainEl
}


const sortTodos = (todos) => {
    return todos.sort((a, b) => {
        if(a.createdAt > b.createdAt) {
            return -1
        } else if (a.createdAt < b.createAt) {
            return 1
        } else {
            return 0
        }
    })
}


const renderHistory = (todos, filters) => {
    const histEl = document.querySelector('#todosHistory')
    todos = sortTodos(todos)
    const filteredTodo = todos.filter(function(todo) {
        return todo.title.toLowerCase().includes(filters.searchText.toLocaleLowerCase())
    })
    
    histEl.innerHTML = ''

    if (filteredTodo.length > 0 ){
        filteredTodo.forEach((todo) => {
            const todoEl = generateTodoDOM(todo)
            histEl.appendChild(todoEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No todo to show'
        emptyMessage.classList.add('empty-Message')
        histEl.appendChild(emptyMessage)
    }

}   


const createDateId = (records) => {
    const recordDateId = `${moment().year()}:${moment().month()}:${moment().date()}`
    const recordIndex = records.findIndex((record) => record.dateId === recordDateId)
    if (recordIndex > -1) {
        return
    } else{
        records.push({
            dateId: recordDateId,
            time: 0,
        })
        saveRecord(records)
    }
}


const addRecord = (pastSec, records) => {
    records.forEach((record) => {
        record.time += pastSec
        console.log(record.time)
    })
    saveRecord(records)
    
}


const getTodayWorkTime = (records) => {
    let second =0
    records.forEach((record) => {
        second = record.time
    })
    let h = Math.floor(second / 3600)
    let m = Math.floor((second % 3600) / 60)
    let s = second % 60
    if (s < 10) {
        s = '0' + s
    }
    if (m < 10) {
        m = '0' + m
    }
    if (h < 10) {
        h = '0' + h
    }

    return `${h}:${m}:${s}`
}


const resetTodayRecord = (records) => {
    records.forEach((record) => {
        record.time = 0
    })
    saveRecord(records)
    
}