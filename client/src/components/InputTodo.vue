<template>
    <div class="input-container">
      <span>+</span>
      <input type="text" class="input-container__input" placeholder="New task..." 
      v-model="newTodo" @keydown.enter="submitInput" 
      />
    </div>
</template>

<script>
export default {
  name: 'InputTodo',
  data() {
      return {
          'newTodo': ''
        }
    },
  methods: {
      submitInput() {

        if (!this.newTodo) {
            return
          }

         const todo = {
            title: this.newTodo,
            completed: false,
            priority: 0,
            dueDate: '',
            notes: ''
         }
         this.newTodo = ''
         this.$emit('add-todo', todo )
      }
    }
}
</script>

<style scoped>

.input-container {
  background-color: var(--color-white);
  padding: 0.5rem;
  border: 2px solid var(--color-grey);
  border-radius: 3px;
}

.input-container:hover {
  border-color: var(--color-median-orange);
}

.input-container__input {
  border: none;
  width: 90%;
  outline: none;
  margin-left: 0.4rem;
}
</style>
