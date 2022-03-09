<template>
    <ul class="list">
      <TodoItem 
        v-for="todo in todos" 
        :todo="todo" 
        :key="todo.id" 

        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
</template>

<script>

import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  props: {
    todos: Array
  },
  methods: {
    deleteTodo(id) {
        this.$emit('delete-todo', id)
    },
    updateTodo(todo) {
        this.$emit('update-todo', todo)
      }
  },
  components: {
      TodoItem
    }
}
</script>

<style scoped>

.list {
  margin-bottom: 2rem;
}

</style>
