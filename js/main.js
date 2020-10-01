'use strict';

let todos, todoToUpdate, categories, categoryId, filter = 'title',  categoryDict = {}


// Async Function
async function init(isFirstInit, data = null) {
    todos = await fetchTodos(filter)
    categories = await fetchCategories()
    let table = $('#tbody')
    let categoryMenuContainer = $('#dropdown-category-menu')
    let categoryFilterContainer = $('#dropdown-category-filter')
    categoryDict = {} // clearing past values
    todos.forEach(todo => {
        (categoryDict[todo.category_id]) ? categoryDict[todo.category_id] += 1 : categoryDict[todo.category_id] = 1
    })
    if(!isFirstInit) { // clearing th DOM
        table.empty()
        categoryMenuContainer.empty()
        categoryFilterContainer.empty()
    }
    renderTodos(table, data)
    renderCategories(categoryMenuContainer) 
    renderCategories(categoryFilterContainer, categoryDict) 
    
}

async function deleteTodo() {
    let id = parseInt(this.parentNode.parentNode.innerText.substring(0,3))
    if(isNaN(id)) return
    let res = await fetchDeleteTodo(id)
    if (res.message === "todo deleted") init(false)

}

async function updateStatus() {
    let id =  parseInt(this.dataset.id)
    let todo = todos.find(todo => {return todo.id === id})
    todo.updated_at = Date.now()
    todo.status = (todo.status) ? 0 : 1
    let res = await fetchUpdateTodo(todo)
    if(res.message === "todo updated") {
        init(false)
    }
}

async function addCategory() {
    let categoryToAdd = $('#category-add-input').val()
    if (categoryToAdd.trim() === '') return
    await fetchAddCategory(categoryToAdd)
    init(false)
}



$('#todo-form').submit( async (e) => { // Add todo form
    e.preventDefault()
    let newTitle = $("[name=title]").val()
    if(!newTitle || !categoryId) {
        alert('Please choose a title and category')
        return
    }
    let newTodo = {
        category_id: categoryId,
        title: newTitle,
        status: 0,
        created_at: Date.now(),
        updated_at: null
    }
    await fetchAddTodo(newTodo)
    init(false)
})

function filterTodosByCategory() {
    let res = todos.filter(todo => {return todo.category_id === parseInt(this.id)})
    init(false, res)
}

function assignCategory() {
    let str = this.id
    categoryId = str
}

// Assigning Filter
function sortTodos(el) {
    filter = (el.name === 'status') ? el.name : 'created_at' 
    init(false)
}


// Edit todo 
function editTodo() {
    todoToUpdate = todos.find(todo => {return todo.id === parseInt(this.dataset.id)})
    $("[name=updated-title]").val(todoToUpdate.title)
    let editCategoryContainer = $('#dropdown-category-edit')
    renderCategories(editCategoryContainer)
    $('#edit-todo-container').show()
}

$('#todo-edit-form').submit( async (e) => {
    e.preventDefault()
    let newTitle = $("[name=updated-title]").val()
    if(!newTitle) {
        alert('Please choose a title and category')
        return
    }
    todoToUpdate = {
        id: todoToUpdate.id,
        category_id: categoryId,
        title: newTitle,
        status: todoToUpdate.status,
        created_at: todoToUpdate.created_at,
        updated_at: Date.now()
    }
    await fetchUpdateTodo(todoToUpdate)
    init(false)
    $('#edit-todo-container').hide()
})



// Render Functions
function renderTodos(table, data) {
    let todosToRender = (data) ? data : todos
    todosToRender.forEach(todo => {
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        th.setAttribute("id", "todo-id")
        th.innerText = todo.id
        tr.appendChild(th)
        for(let i=0; i<4; i++) {
            let td = document.createElement('td')
            switch (i) {
                case 0:
                    td.innerText = todo.title
                    break;
                case 1:
                    td.innerText = (todo.status) ? "Completed" : "In progress"
                    if (todo.status) {
                        td.classList.add('complete')
                    }
                    break;
                case 2:
                    td.innerText = new Date(todo.created_at).toDateString()
                    break;
                case 3:
                    for (let j=0; j<3; j++) {
                        let btn = document.createElement('button')
                        btn.classList.add('btn')
                        switch (j) {
                            case 0:
                                btn.innerText = "Delete"
                                btn.classList.add("delete-btn")
                                btn.addEventListener('click', deleteTodo, false)
                                break;
                            case 1:
                                btn.innerText = "Status"
                                btn.classList.add("update-btn")
                                btn.setAttribute("data-id", todo.id)
                                btn.addEventListener('click', updateStatus, false)
                                break;
                            case 2:
                                btn.innerText = "Edit"
                                btn.classList.add("edit-btn")
                                btn.setAttribute("data-id", todo.id)
                                btn.addEventListener('click', editTodo, false)
                        }
                        td.append(btn)
                    }
            }
            tr.appendChild(td)
        }
        table.append(tr)
    })
}

function renderCategories(container, dict) {
    let categoriesToRender = categories
    categoriesToRender.forEach(query => {
        let el = document.createElement('a')
        el.classList.add('dropdown-item')
        el.classList.add('category')
        el.setAttribute("id", `${query.id}`)
        if(dict) {
            el.addEventListener('click', filterTodosByCategory, false)
            el.innerText = (dict[query.id]) ? `${query.category_name} - ${dict[query.id]}` : `${query.category_name} - 0`
        }
        else {
            el.addEventListener('click', assignCategory, false)
            el.innerText = query.category_name
        }
        container.append(el)
    })
}