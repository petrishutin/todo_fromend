<template>
  <div class="border border-2 rounded p-2">
    <transition-group name="todo-list">
      <TodoItem
          class="todo border border-2"
          v-for="todo in todos"
          :todo="todo"
          :key="todo._id"
          @remove="$emit('remove', todo)"
          @edit="$emit('edit', todo)"
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
    padding: 10px;
    margin-top: 10px;
    justify-content: space-between;
    border-color: #070760; /* Color of the border */
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
