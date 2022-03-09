<template>

  <footer class="actionbar" :class="{'actionbar--hide': !checked }"> 
    <div class="actionbar__main" v-show="checked">
      <button class="actionbar__show-toggle" @click="toggle">{{tasksLegend}}</button>
      <button class="actionbar__clear-done" @click="clearDone">Clear Done Tasks</button>
    </div>
    <button 
      v-show="todos.length > 0" 
      @click="clearAll" 
      class="actionbar__clear-all"
    >
    Clear All Tasks
    </button>
  </footer>

</template>

<script>
export default {
  name: 'Footer',
  props: {
    todos: Object,
    visibility: String
  },
  methods: {
      clearAll() {
          this.$emit('clear-all', 'all')
      },
      clearDone() {
          this.$emit('clear-completed', 'completed')
      },
      toggle() {
          this.$emit('toggle')
      },
      todosCompleted() {
          return this.todos.filter(todo => todo.completed).length
      }
    },
    computed: {
      tasksLegend() {
          if(this.visibility === 'all') {
           return  `Hide Done Tasks (${this.todosCompleted()})`
          } else {
           return  `Show Done Tasks (${this.todosCompleted()})`
           }
      },
      checked() {
          return this.todosCompleted() > 0
      }
    }
}
</script>

<style scoped>

.actionbar {
  position: fixed;

  display: flex;
  justify-content: space-between;

  bottom: 1rem;
  left: 0;

  padding: 0.7rem;
  width: 100%;
  background-color: var(--color-white);
  border: 2px solid var(--color-grey);
}

.actionbar__main {
  margin-left: auto;
}

.actionbar__show-toggle {
  width: 450px;
  padding: 0.5rem;

  border: 2px solid var(--color-grey);
  border-radius: 3px;

  background-color: var(--color-white);
  color: var(--color-near-black);

  font-size: 1em;
  font-weight: 501;
}

.actionbar__show-toggle:hover {
  border-color: var(--color-median-orange);
  color: var(--color-black);
}

.actionbar__clear-done {
  padding: 0.5rem;

  border: 2px solid var(--color-grey);
  border-radius: 3px;

  background-color: var(--color-white);
  color: var(--color-near-black);

  font-size: 1em;
  font-weight: 501;
}

.actionbar__clear-done:hover {
  border-color: var(--color-median-orange);
  color: var(--color-black);
}

.actionbar__clear-all {
  padding: 0.5rem;
  margin-left: auto;

  border: 2px solid var(--color-grey);
  border-radius: 3px;

  background-color: var(--color-white);
  color: var(--color-near-black);

  font-size: 1em;
  font-weight: 501;
}

.actionbar__clear-all:hover {
  border-color: var(--color-median-orange);
  color: var(--color-black);
}

.actionbar--hide {
  border-color: var(--color-light-blue);
  background-color: var(--color-light-blue);
  z-index: -1;
}

</style>
