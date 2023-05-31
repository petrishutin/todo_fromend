<template>
  <div class="todo bg-light p-3 mb-2 align-items-lg-start justify-content-start">
    <div>
      <p class="mb-1">Status: {{ todo.status }}</p>
      <p class="mb-1">Title {{ todo.title }}</p>
      <p class="mb-1">Description: {{ todo.description }}</p>
    </div>
    <div class="ms-auto">
      <button class="btn btn-primary me-2"
        @click="$emit('edit', todo)"
      >Edit</button>
      <button class="btn btn-danger"
        @click="$emit('remove', todo)"
      >Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
