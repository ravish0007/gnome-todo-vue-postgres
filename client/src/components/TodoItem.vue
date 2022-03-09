<template>
    <li class="list-item" :class="styleClass"> 

        <div class="list-item__primary-content">
          <span class="list-item__title">
              <input 
                class="list-item__checkbox" 
                type="checkbox" 
                v-model="completed" 
                @change="updateTodo"
               />
               <input 
                  class="list-item__input" 
                  :class="{ 'list-item__input--strike': completed }" 
                  v-model="title" 
                  @blur="updateTodo" 
               />
           </span>
           <span>
             <span class="list-item__due-date">{{duedate}}</span>
             <button @click="toggleSecondaryContent" class="list-item__expander">▾</button>
           </span>
         </div>


         <div class="list-item__secondary-content" v-show="secondaryContentVisiblity" >
              <div class="list-item__notes-content">
                  <p class="list-item__label">Notes</p>
                  <textarea class="list-item__textarea" v-model="notes" @blur="updateTodo" ></textarea>
              </div>
              <div class="list-item__priority-content">
                  <div>
                      <p class=list-item__label>Due Date</p>
                      <input type="date" class="list-item__selector" v-model="duedate" @change="updateTodo" />
                      
                      <p class="list-item__label">Priority</p>
                      <select class="list-item__selector" v-model="priority" @change="updateTodo">
                           <option v-for="(priority, index) in priorities" :value="index" :key="index">{{ priority }}</option> 
                      </select>
                  </div>
                  <button class="list-item__button list-item__button--danger">Delete</button>
              </div>
         </div>
    </li>
</template>

<script>

export default {
  name: 'TodoItem',
  props: {
    todo: Object
  },
  data() {
      return {
          'id': '',
          'title': '',
          'completed': '',
          'notes': '',
          'duedate': '',
          'priority': null,

          'secondaryContentVisiblity': false,
          'priorities': ['None', 'Low', 'Medium', 'High'],
        }
    },
    computed: {
      shortDate() {
          const date = new Date(Date.parse(this.duedate))
          if(this.duedate) {
                return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + String(date.getFullYear()).slice(2))
          }
          return ''
        },
      styleClass() {
          return `list-item--priority-${this.priorities[this.priority].toLowerCase()}`
        }
      },
    methods: {
        toggleSecondaryContent() {
            this.secondaryContentVisiblity = !this.secondaryContentVisiblity
        },
        updateTodo() {

           if (!this.todo.title) {
               return
           }

           let todo = {
             id: this.id,
             title : this.title,
             completed : this.completed,
             notes : this.notes,
             priority : this.priority,
             duedate : this.duedate
           }

           this.$emit('update-todo', todo) 
       },
       deleteTodo() {
            this.$emit('delete-todo', this.todo.id )
      }
    },
    created() {
        this.id = this.todo.id
        this.title = this.todo.title
        this.completed = this.todo.completed
        this.notes = this.todo.notes
        this.duedate = this.todo.duedate
        this.priority = this.todo.priority
      }
}
</script>

<style scoped>

.list-item {
  list-style-type: none;
  padding: 0.5em;
  background-color: var(--color-white);
  border: 2px solid var(--color-grey);
  border-radius: 3px;
}

.list-item__primary-content {
  display: flex;
  justify-content: space-between;
}

.list-item__checkbox {
  margin: 0.4em;
}

.list-item__title {
  width: 70%;
}

.list-item__input {
  border: none;
  outline: none;
  width: 90%;
}

.list-item__input--strike {
  text-decoration: line-through;
  color: var(--color-strike);
}

.list-item__due-date {
  font-size: 0.8em;
  color: #666666;
  margin-right: 5px;
}

.list-item__expander {
  background-color: var(--color-white);
  padding: 2px 5px;
  border: 2px solid var(--color-white);
}

.list-item__expander:hover {
  border: 2px solid var(--color-median-orange);
  border-radius: 3px;
}

.list-item__expander--expand {
  transform: rotate(180deg);
}

/* -------------------------------------------------------*/

.list-item__secondary-content {
  height: 250px;
  background-color: var(--color-white);
  border-top: 1px solid;
  border-color: #cacaca;
  margin: 0.5em;

  display: flex;
  justify-content: space-between;
}

.list-item__label {
  display: block;
  color: #666666;
  margin-top: 7px;
  margin-bottom: 7px;
  font-size: 0.9em;
}

.list-item__notes-content {
  width: 60%;
}

.list-item__textarea {
  width: 100%;
  height: 13rem;
  resize: none;
  outline: none;
  margin-right: 0.9rem;
  border: 1px groove #cccccc;
  border-radius: 2px;
}

.list-item__textarea:hover {
  border-color: var(--color-median-orange);
}

.list-item__priority-content {
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

.list-item__priority-content > div {
  width: 100%;
}

.list-item__selector {
  width: 100%;
  border: 1px groove #cccccc;
  border-radius: 2px;
  padding: 5px;
  outline: none;
  background-color: #ffffff;
  color: #444444;
}

.list-item__button {
  width: 80px;
  height: 35px;
  border: 0.5px solid #b14451;
  border-radius: 4px;
}

.list-item__button:hover {
  color: var(--color-white);
  box-shadow: 1px 1px 1px #555555;
}

.list-item__button--danger {
  background-color: var(--color-red);
  color: var(--color-white);
}

/* -------------------------------------------------------*/

.list-item--hide {
  display: none;
}

.list-item--priority-none {
  border-left: 3px solid var(--color-grey);
}

.list-item--priority-low {
  border-left: 3px solid var(--color-low-priority);
}

.list-item--priority-medium {
  border-left: 3px solid var(--color-medium-priority);
}

.list-item--priority-high {
  border-left: 3px solid var(--color-high-priority);
}

</style>
