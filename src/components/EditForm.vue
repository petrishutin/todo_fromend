<template>
  <form class="form" @submit.prevent>
    <h4>Edit TdDo</h4>
    <app-select
        v-model="clonedTodo.status"
        :options="todoStatusOptions"/>
    <app-input
        v-model="clonedTodo.title"
        type="text"
        placeholder="Title"/>
    <app-input
        v-model="clonedTodo.description"
        class="content_input"
        type="text"
        placeholder="Description"
    />
    <button class="btn btn-primary" type="submit" @click="editTodo">Edit</button>
  </form>
</template>

<script>
import AppInput from "@/components/UI/AppInput.vue";
import axios from "axios";

export default {
  components: {AppInput},
  props: {
    todo: Object
  },
  data() {
    return {
      todoStatusOptions: [
        {value: 'todo', name: 'ToDo'},
        {value: 'in_progress', name: 'In progress'},
        {value: 'done', name: 'Done'},
      ]
    }
  },
  created() {
    this.clonedTodo = JSON.parse(JSON.stringify(this.todo))
  },
  methods: {
    async editTodo() {
      try {
        const response = await axios.put(
            `${process.env.VUE_APP_API_ROOT}todo/${this.clonedTodo._id}`,
            {
              'status': this.clonedTodo.status,
              'title': this.clonedTodo.title,
              'description': this.clonedTodo.description
            },
            {
              headers: {Authorization: this.$store.state.auth.token}
            }
        )
        if (response.status === 200) {
          this.$emit('commitEdit', this.clonedTodo);
        }
      } catch (e) {
        console.log(e);
      }
    },
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