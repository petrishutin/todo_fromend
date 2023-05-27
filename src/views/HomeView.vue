<template>
  <AppNavbar class="fixed-top"/>
  <div class="content-body">
    <div class="app_btns">
      <button class=" btn btn-primary" @click="showCreate">Create todo</button>
    </div>
    <app-dialog v-model:show="createVisible">
      <PostForm
          @create="createTodo"
      />
    </app-dialog>
    <app-dialog v-model:show="editVisible">
      <EditForm
          :todo="selectedTodo"
          @commitEdit="commitEditTodo"
      />
    </app-dialog>
    <app-spinner v-if="isLoading"></app-spinner>
    <div class="row" v-else>
      <div class="col">
        <h4>Todo</h4>
        <TodoList :todos="todos.filter(todo => todo.status === 'todo')" @remove="removeTodo" @edit="editIsVisible"
        />
      </div>
      <div class="col">
        <h4>In Progress</h4>
        <TodoList :todos="todos.filter(todo => todo.status === 'in_progress')" @remove="removeTodo" @edit="editIsVisible"/>
      </div>
      <div class="col">
        <h4>Done</h4>
        <TodoList :todos="todos.filter(todo => todo.status === 'done')" @remove="removeTodo" @edit="editIsVisible"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import PostForm from '@/components/PostForm.vue'
import EditForm from "@/components/EditForm.vue";
import TodoList from '@/components/TodoList.vue'
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      createVisible: false,
      editVisible: false,
      isLoading: true,
      selectedTodo: null
    }
  },
  methods: {
    createTodo(todo) {
      this.todos.push(todo)
      this.createVisible = false
    },
    async removeTodo(todo) {
      try {
        this.isLoading = true;
        const response = await axios.delete(
            `http://localhost:8000/api/v1/todo/${todo._id}`,
            {headers: {Authorization: this.$store.state.auth.token}}
        );
        if (response.status === 204) {
          this.todos = this.todos.filter(t => t._id !== todo._id);
        } else {
          console.log(response)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false;
      }
    },
    editIsVisible(todo) {
      this.editVisible = true;
      this.selectedTodo = todo;
    },
    commitEditTodo(updatedTodo) {
      const index = this.todos.findIndex(t => t._id === updatedTodo._id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
      this.editVisible = false;
    },
    showCreate() {
      this.createVisible = true
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
    EditForm,
    TodoList,
    AppNavbar
  }
  ,
}
</script>

<style scoped>
.content-body {
  padding-top: 75px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>