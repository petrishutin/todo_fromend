<template>
  <AppNavbar class="fixed-top"/>
  <div class="content-body">
    <div class="app_btns">
      <button class=" btn btn-primary" @click="showDialog">Create todo</button>
    </div>
    <app-dialog v-model:show="dialogVisible">
      <PostForm
          @create="createTodo"
      />
    </app-dialog>
    <app-spinner v-if="isLoading"></app-spinner>
    <TodoList
        v-else
        :todos="todos"
        @remove="removeTodo"
    />

  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import PostForm from '@/components/PostForm.vue'
import TodoList from '@/components/TodoList.vue'
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      dialogVisible: false,
      isLoading: true,
    }
  },
  methods: {
    createTodo(todo) {
      this.todos.push(todo)
      this.dialogVisible = false
    },
    async removeTodo(todo) {
      try {
        this.isLoading = true;
        const response = await axios.delete(
            `http://localhost:8000/api/v1/todo/${todo.id}`,
            {headers: {Authorization: this.$store.state.auth.token}}
        );
        if (response.status === 204) {
          this.todos = this.todos.filter(t => t.id !== todo.id);
        } else {
          console.log(response)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchTodos() {
      this.isLoading = true
      try {
        const response = await axios.get('http://localhost:8000/api/v1/todo', {
          headers: {
            Authorization: this.$store.state.auth.token
          }
        })
        this.todos = response.data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchTodos()
  }
  ,
  components: {
    PostForm,
    TodoList,
    AppNavbar
  }
  ,
}
</script>

<style scoped>
.content-body {
  padding-top: 75px;
}
</style>