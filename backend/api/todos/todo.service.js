const { connect } = require('../../services/db.service')


module.exports = {
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo
}


async function getTodos(filter) {
    try {
        let conn = await connect()
        let todos
        switch(filter) {
            case 'title':
                todos = await conn.query('SELECT * FROM todos ORDER BY title ASC')
                break;
            case 'status':
                todos = await conn.query('SELECT * FROM todos ORDER BY status ASC')
                break;
            case 'created_at':
                todos = await conn.query('SELECT * FROM todos ORDER BY created_at ASC')
                break;
        }
        return todos[0]
    } catch(err) {
        console.warn('Something went wrong at fetching todos', err)
        throw err
    }
}

async function addTodo(newTodo) {
    try {
        let conn = await connect()
        await conn.query('INSERT INTO todos SET ?', [newTodo])
        
        return
    } catch(err) {
        console.warn('Something went wrong at fetching todos', err)
        throw err
    }
}

async function deleteTodo(id) {
    try {
        let conn = await connect()
        await conn.query('DELETE FROM todos WHERE id = ?', [id])
        
        return
    } catch (err) {
        throw err
    }
}

async function updateTodo(newTodo) {
    try {
        let conn = await connect()
        await conn.query('UPDATE todos SET title = ?, status = ?, updated_at = ? WHERE id = ?',[newTodo.title, newTodo.status, newTodo.updated_at, newTodo.id])
        return
    } catch (err) {
        throw err
    }
}



