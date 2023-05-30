<template>
  <form class="form" @submit.prevent>
    <app-select
        v-model="todoStatus"
        :options="todoStatusOptions"/>
    <app-input
        v-model="todo.title"
        type="text"
        placeholder="Title"/>
    <app-input
        v-model="todo.description"
        class="content_input"
        type="text"
        placeholder="Description"
    />
    <button class="btn btn-primary" type="submit" @click="createTodo">Add</button>
  </form>
</template>

<script>
import AppInput from "@/components/UI/AppInput.vue";
import axios from "axios";

export default {
  components: {AppInput},
  data() {
    return {
      todo: {
        _id: '',
        status: 'todo',
        title: '',
        description: ''
      },
      todoStatus: '',
      todoStatusOptions: [
        {value: 'todo', name: 'ToDo'},
        {value: 'in_progress', name: 'In progress'},
        {value: 'done', name: 'Done'},
      ]
    }
  },
  methods: {
    async createTodo() {
      try {
        const response = await axios.post(
            `${process.env.VUE_APP_API_ROOT}todo`,
            {'status': this.todo.status, 'title': this.todo.title, 'description': this.todo.description},
            {
              headers: {Authorization: this.$store.state.auth.token}
            }
        )
        this.todo._id = response.data
        this.$emit('create', this.todo)
        this.todo = {
          status: 'new',
          title: ''
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    todoStatus(newStatus) {
      this.todo.status = newStatus
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.btn {
  align-self: flex-end;
}

.content_input {
  height: 6em;
  vertical-align: top;
  word-break: break-all;
}
</style>