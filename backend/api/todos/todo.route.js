const express = require('express')
const router = express.Router()
const {controlGetTodos, controlAddTodo, controlDeleteTodo, controlUpdateTodo} = require('./todo.controller')

router.get('/', controlGetTodos)
router.post('/', controlAddTodo)
router.delete('/', controlDeleteTodo)
router.put('/', controlUpdateTodo)

module.exports = router

