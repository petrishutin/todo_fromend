<template>
  <div>
    <h3>Your TODOs</h3>
    <transition-group name="todo-list">
      <TodoItem
          class="todo"
          v-for="todo in todos"
          :todo="todo"
          :key="todo.id"
          @remove="$emit('remove', todo)"
      />
    </transition-group>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.todo {
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    border: 2px solid #070760;
    padding: 10px;
    margin-top: 10px;
    justify-content: space-between;
}
.todo-list-move, /* apply transition to moving elements */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.todo-list-leave-active {
  position: absolute;
}
</style>