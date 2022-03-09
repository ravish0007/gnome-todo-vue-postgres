const { Router } = require('express');

const todoController = require('../controllers');

const router = Router();

router.get('/', todoController.fetchAllTodos);
router.post('/', todoController.insertTodo);
router.put('/', todoController.updateTodo);
router.delete('/', todoController.deleteMultiple);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;

