<template>
  <div class="todo bg-light p-3 mb-2 align-items-center justify-content-start">
    <div>
      <h5 class="mb-1">{{ todo.title }}</h5>
      <p class="mb-1">Status: {{ todo.status }}</p>
      <p class="mb-1">Description: {{ todo.description }}</p>
    </div>
    <div class="ms-auto">
      <button class="btn btn-primary me-2">Edit</button>
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
