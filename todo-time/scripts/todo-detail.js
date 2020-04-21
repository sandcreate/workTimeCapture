'use strict'

const titleElement = document.querySelector('#titleText')
const bodyElement = document.querySelector('#bodyText')
const editElement = document.querySelector('#edit-save-todo')
const removeElement = document.querySelector('#delete-todo')


const timeElement = document.querySelector('#display-timer')
const hourElement = document.querySelector('#select-hour')
const minuteElement = document.querySelector('#select-minute')
const startTimeElement = document.querySelector('#start-timer')
const stopTimeElement = document.querySelector('#stop-timer')
const cancelTimeElement = document.querySelector('#cancal-timer')
const recordTimeElement = document.querySelector('#record-time')


const indiElement = document.querySelector('#this-total-record')
const totalElement = document.querySelector('#today-total-record')
const resetRecordElement = document.querySelector('#reset-record')

const todoId = location.hash.substring(1)
let todos = getSavedTodos()
let records = getSaveRecords()
createDateId(records)

totalElement.textContent = getTodayWorkTime(records)


let timerRunning = false
let timerId
let h, m, s = 0
let sec
let pastSec = 0
let restSec = 0
let minute
timeElement.textContent = '00:00:00'
recordTimeElement.disabled = true
stopTimeElement.disabled = true

let todo = todos.find((todo) => {
    return todo.id === todoId
})

if (!todo) {
    location.assign('/index.html')
}



titleElement.value = todo.title
if (typeof todo.body === 'string') {
    bodyElement.value = todo.body
} else {
    bodyElement.value = ''
    
}

editElement.addEventListener('click', (e) => {
    todo.title = titleElement.value
    todo.body = bodyElement.value
    
    console.log(titleElement.value)
    saveTodo(todos)
})


removeElement.addEventListener('click', (e) => {
    removeTodo(todo.id)
    saveTodo(todos)
    location.assign('/index.html')
})



startTimeElement.addEventListener('click', (e) => {
    const inputHour = parseInt(hourElement.value,10)
    const inputMinute = parseInt(minuteElement.value, 10)

    console.log(timerRunning)
    
    if (timerRunning === false) {
        
        if(isNaN(inputHour)) {      
            if( isNaN(inputMinute)) {
                // No input time 
                hourElement.value = ''
                minuteElement.value = ''
                if(sec > 0) {
                    startTimeElement.disabled = true
                    stopTimeElement.disabled = false
                    recordTimeElement.disabled = true
                    calculateTimer(sec)
                }
            }else {
                // Only input minute          
                calculateTimer(inputMinute * 60)
                resetTimerDiplayState()
                
                
            }      
        } else {
            if (isNaN(inputMinute)) {
                // Only input hour
                calculateTimer(inputHour * 60 * 60)     
                resetTimerDiplayState()         
                
            } else {
                // input hour and minute
                calculateTimer(inputMinute * 60 + inputHour * 60 * 60)
                resetTimerDiplayState()
            }
            
        }
    } else {
    }
})


stopTimeElement.addEventListener('click', (e) => {
    
    stopTimer()
})


cancelTimeElement.addEventListener('click', () => {    
    resetTimer()
    recordTimeElement.disabled = true
})


recordTimeElement.addEventListener('click', (e) => {
    
    addRecord(pastSec, records)
    recordTimeElement.disabled = true
    resetTimer()
    location.reload()
})


resetRecordElement.addEventListener('click', () => {
    resetTodayRecord(records)
    location.reload()
})


const calculateTimer = (second) => {    
    timerRunning = true 
    sec = second

    timerId = setInterval(() => {
        sec--
        pastSec++
        
        h = Math.floor(sec / 3600)
        m = Math.floor((sec % 3600) / 60)
        s = sec % 60
        timeElement.classList.add('complex-time')
        if(s < 10) {
            s = '0' + s
        }
        if(m < 10) {
            m = '0' + m
        }
        if(h < 10) {
            h = '0' + h
        }
        timeElement.textContent = `${h}:${m}:${s}`
        if (sec === 0) {
            restSec = pastSec
            resetTimer()
            console.log('finish')
        }
    }, 1000)
}


const stopTimer = () => {
    if(timerRunning === true) {

        clearInterval(timerId)
        timerRunning = false
        startTimeElement.disabled = false
        stopTimeElement.disabled = true
        hourElement.value = ''
        minuteElement.value = ''
        recordTimeElement.disabled = false
    } else {

    }
}


const resetTimer = () => {
    
    clearInterval(timerId)
    sec = 0
    h = m = s = 0
    pastSec = 0
    timeElement.textContent = '00:00:00'
    timerRunning = false
    startTimeElement.disabled =false
    stopTimeElement.disabled = true
}


const resetTimerDiplayState = () => {
    hourElement.value = ''
    minuteElement.value = ''
    startTimeElement.disabled = true
    stopTimeElement.disabled = false
}


