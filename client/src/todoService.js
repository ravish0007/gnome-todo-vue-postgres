import axios from "axios"

const BASE_URL = '/api/todos'

class TodoService {
  static async getTodos() {
    try {
      const response = await axios.get(BASE_URL) //use data destructuring to get data from the promise object
      return response.data.todos
    }

    catch (error) {
      console.log(error);
    }

  }

  static async newTodo(todo) {
    try {
      const response = await axios.post(BASE_URL, todo) //use data destructuring to get data from the promise object
      return response.data.id
    }

    catch (error) {
      console.log(error);
    }
  }

  static updateTodo(todo) {
    return axios.put(`${BASE_URL}/${todo.id}`, todo)
  }

  static deleteTodo(todoID) {
    return axios.delete(`${BASE_URL}/${todoID}`)
  }

  static deleteMultiple(type) {
    return axios.delete(BASE_URL, { data: { type } })
  }
}

export default TodoService


