const db = require('../models')

async function fetchAllTodos(request, response) {

  const [error, result] = await db.fetchAllTodos()

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.send({ 'todos': result })
}


async function insertTodo(request, response) {

  const todo = request.body

  if (!todo.title) {
    response.status(400).json({ error: 'todo title cannot be empty' })
    return
  }

  const [error, result] = await db.insertTodo(todo)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.send(result)
}


async function updateTodo(request, response) {

  const todo = request.body

  if (!todo.title) {
    response.status(400).json({ error: 'todo title cannot be empty' })
    return
  }

  const [error, result] = await db.updateTodo(todo)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.status(201).end()

}

async function deleteTodo(request, response) {

  if (!request.body.id) {
    response.status(400).json({ error: 'id missing in params' })
    return
  }

  const [error, result] = await db.deleteTodo(request.body.id)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }

  response.status(201).end()
}


async function deleteMultiple(request, response) {

  if (!request.body.type) {
    response.status(400).json({ error: 'type missing in param' })
    return
  }

  const [error, result] = await db.deleteMultiple(request.body.type)

  if (error) {
    console.log(error.stack)
    response.status(500).end()
  }
  response.status(201).end()
}

module.exports = {
  fetchAllTodos,
  insertTodo,
  updateTodo,
  deleteTodo,
  deleteMultiple
}
