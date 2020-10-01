'use strict';
const BASE_URL = "//localhost:3000/api/"


async function fetchTodos(filter) {
    let q = `?q=${filter}`
    try {
        const res = await axios.get(`${BASE_URL}todos` + q)
        return res.data
    } catch(err) {
        console.warn('cannot fetch todos from server')
    }
}

async function fetchCategories() {
    try {
        const res = await axios.get(`${BASE_URL}category`)
        return res.data
    } catch (err) {
        console.warn('cannot fetch todos from server')
    }
}

async function fetchDeleteTodo(query) {
    let q = `?q=${query}`
    try {
        const res = await axios.delete(`${BASE_URL}todos` + q)
        return res.data
        
    } catch (err) {
        console.warn('cannot delete todo')
    }
}

async function fetchUpdateTodo(todo) {
    try {
        const res = await axios({
            method: 'put',
            url: `${BASE_URL}todos`,
            data: {todo:todo}
        })
        return res.data
        
    } catch (err) {
        console.warn('cannot update todo')
    }
}

async function fetchAddTodo(newTodo) {
    try {
        const res = await axios({
            method: 'post',
            url: `${BASE_URL}todos`,
            data: {todo:newTodo}
        })
        return res.data
        
    } catch (err) {
        console.warn('cannot add todo')
    }
}

async function fetchAddCategory(query) {
    let q = `?q=${query}`
    try {
        const res = await axios.post(`${BASE_URL}category` + q)
        return res.data
        
    } catch (err) {
        console.warn('cannot add category')
    }
}