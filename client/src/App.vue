<template>
  <div class="app-container">
    <TodoList :todos="effectiveTodos"  
        @delete-todo="deleteTodo"
        @update-todo="updateTodo"
    />
    <InputTodo 
        @add-todo="addTodo"
    />
  </div>
  <Footer 
    :todos="todos"
    :visibility="visibility"
    @clear-all="deleteMultiple"
    @clear-completed="deleteMultiple"
    @toggle="toggleVisibility"
  />
</template>

<script>
import TodoList from './components/TodoList.vue'
import InputTodo  from './components/InputTodo.vue'
import Footer  from './components/Footer.vue'

import TodoService from './todoService.js'

export default {
  name: 'App',
  components: {
    TodoList,
    InputTodo,
    Footer
  },
  data() {
      return {
          "todos": [],
          "visibility": "completed",
        }
    },
  async mounted() {
    this.todos = await TodoService.getTodos()
  },
  methods: {
    async addTodo(todo) {
      const newTodoId = await TodoService.newTodo(todo)
      this.todos.push({ ...todo, id:newTodoId})
      },

      updateTodo(todo) {
       const response = TodoService.updateTodo(todo)
       response.then( this.todos = this.todos.map(t => (t.id === todo.id ? todo: t)))
      },

      deleteTodo(todoID) {
        const response = TodoService.deleteTodo(todoID)
        response.then(this.todos = this.todos.filter(todo => todo.id !== todoID))
      },

      deleteMultiple(type) {
        let response
        switch(type) {
            case 'all':
               response = TodoService.deleteMultiple(type)
               response.then(this.todos = [])
               break
            case 'completed':
               response = TodoService.deleteMultiple(type)
               response.then(this.todos = this.todos.filter(todo => !todo.completed))
               break
          }
      },
      toggleVisibility() {
          if (this.visibility === 'all') {
              this.visibility = 'completed'
            }
          else {
              this.visibility = 'all'
            }
        }
    },
    computed: {
      effectiveTodos() {
        if(this.visibility === 'all'){
          return this.todos
          }
        else {
            return this.todos.filter(todo => !todo.completed)
          }
        }
  }
}

</script>

<style>

.app-container {
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  margin-top: 1.5rem;
  margin-bottom: 10rem;
}

</style>
