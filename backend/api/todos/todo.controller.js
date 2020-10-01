const {getTodos, addTodo, deleteTodo, updateTodo} = require('./todo.service')


module.exports = {
    controlGetTodos,
    controlAddTodo,
    controlDeleteTodo,
    controlUpdateTodo
}

async function controlGetTodos(req, res) {
    const {q} = req.query
    try {
        let todos = await getTodos(q)
        res.json(todos)
    } catch (err) {
        res.status('500').send('could not get todos')
    }
}

async function controlAddTodo(req, res) {
    const todoToAdd = req.body.todo

    try {
        await addTodo(todoToAdd)
        res.json({message: "todo added"})
    } catch (err) {
        res.status('500').send('could not add todo')
    }
}



async function controlDeleteTodo(req, res) {
    const {q} = req.query
    try {
        await deleteTodo(q)
        res.json({message: "todo deleted"})
    } catch (err) {
        res.status('500').send('could not delete todo')
    }
}


async function controlUpdateTodo(req, res) {
    const todoToUpdate = req.body.todo

    try {
        await updateTodo(todoToUpdate)
        res.json({message: "todo updated"})
    } catch (err) {
        res.status('500').send('could not update todo')
    }
}

