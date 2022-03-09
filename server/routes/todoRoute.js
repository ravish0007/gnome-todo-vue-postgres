const { Router } = require('express');

const todoController = require('../controllers');

const router = Router();

router.get('/', todoController.fetchAllTodos);
router.post('/', todoController.insertTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.delete('/', todoController.deleteMultiple);

module.exports = router;

