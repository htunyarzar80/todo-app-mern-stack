const Todo = require("../models/todoModel");

exports.getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      todos
    });
  } catch (error) {
    next(error);
  }
};

module.exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
    });
    console.log(todo);
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.todo_id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
   try {
       const todo = await Todo.findByIdAndRemove(req.params.todo_id);
       res.status(200).json({
           success: true,
           message: "Todo is Successfully deleted"
       })
   } catch (error) {
       next(new ErrorResponse("server error", 500));
   }
}