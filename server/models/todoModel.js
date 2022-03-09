const Pool = require('pg').Pool

const config = require('../config')

const pool = new Pool(config.db)

async function fetchAllTodos() {
  try {
    const result = await pool.query('SELECT * FROM todos WHERE status=1')
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function insertTodo(todo) {
  try {
    const query = `INSERT into todos
                   (title, completed, priority,
                   notes, duedate, status) values
                   ($1, $2, $3, $4, $5, $6) RETURNING id`

    const values = [todo.title, todo.completed, todo.priority,
    todo.notes, todo.duedate, 1]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function updateTodo(todo) {
  try {
    const query = `UPDATE todos SET
                   title = $2, completed = $3, priority = $4,
                   notes = $5, duedate = $6 WHERE id = $1 
                   AND status = 1`

    const values = [todo.id, todo.title, todo.completed, todo.priority,
    todo.notes, todo.duedate]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function deleteTodo(id) {
  try {
    const query = `UPDATE todos SET
                   status = 0 WHERE 
                   id = $1`

    const values = [id]

    const result = await pool.query(query, values)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

async function deleteMultiple(type) {
  let query = ''

  switch (type) {
    case 'completed':
      query = 'UPDATE todos SET status = 0 WHERE completed = TRUE'
      break
    case 'all':
      query = 'UPDATE todos SET status = 0'
      break
  }

  try {
    const result = await pool.query(query)
    return [null, result.rows]
  } catch (error) {
    return [error, null]
  }
}

module.exports = {
  fetchAllTodos,
  insertTodo,
  updateTodo,
  deleteTodo,
  deleteMultiple
}
