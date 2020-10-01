const {getCategory, addCategory, updateCategory, deleteCategory} = require('./category.service')

module.exports = {
    controlGetCategories,
    controlAddCategory,
    controlDeleteCategory,
    controlUpdateCategory
}

async function controlGetCategories(req, res) {
    try {
        let data = await getCategory()
        res.json(data)
    } catch (err) {
        res.status('500').send('could not add category')
    }
}

async function controlAddCategory(req, res) {
    let {q} = req.query
    try {
        await addCategory(q)
        res.json({message: "category added"})
    } catch (err) {
        res.status('500').send('could not add category')
    }
}


async function controlDeleteCategory(req, res) {
    let {q} = req.query
    try {
        await deleteCategory(q)
        res.json({message: "category deleted"})
    } catch (err) {
        res.status('500').send('could not delete category')
    }
}


async function controlUpdateCategory(req, res) {
    let categoryToUpdate = req.body.category
    try {
        await updateCategory(categoryToUpdate)
        res.json({message: "category updated"})
    } catch (err) {
        res.status('500').send('could not update category')
    }
}