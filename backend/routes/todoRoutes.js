const express = require('express')
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoControllers')
const router = express.Router()

//get
router.get("/",getTodos)
router.post("/create",createTodo)
router.put("/update/:todo_id",updateTodo)
router.delete("/delete/:todo_id",deleteTodo)



module.exports = router
