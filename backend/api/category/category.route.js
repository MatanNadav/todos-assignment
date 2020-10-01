const express = require('express')
const router = express.Router()
const {controlGetCategories, controlAddCategory, controlDeleteCategory, controlUpdateCategory} = require('./category.controller')


router.get('/', controlGetCategories)
router.post('/', controlAddCategory)
router.delete('/', controlDeleteCategory)
router.put('/', controlUpdateCategory)

module.exports = router