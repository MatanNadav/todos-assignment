
const { connect } = require('../../services/db.service')

module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory
}



async function getCategory() {
    try {
        let conn = await connect()
        const res = await conn.query('SELECT * FROM todos_category')
        
        return res[0]
    } catch (err) {
        throw err
    }
}

async function addCategory(name) {
    try {
        let conn = await connect()
        await conn.query('INSERT INTO todos_category SET category_name = ?',[name])
        
    } catch (err) {
        throw err
    }
}

async function deleteCategory(id) {
    try {
        let conn = await connect()
        await conn.query('DELETE FROM todos_category WHERE id = ?', [id])
        
    } catch (err) {
        throw err
    }
}

async function updateCategory(category) {
    try {
        let conn = await connect()
        await conn.query('UPDATE todos_category SET category_name = ? WHERE id = ?',[category.category_name, category.id])
        
    } catch (err) {
        throw err
    }
}