<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  data() {
    return {
      username: '',
      password: '',
      name: '',
      email: '',
      password1: '',
      password2: '',
      isLoginMode: true, // Флаг, определяющий режим: логин или регистрация
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();

      if (this.isLoginMode) {
        // Логика для логина
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
      } else {
        // Логика для регистрации
        if (this.password1 !== this.password2) {
          alert('Passwords do not match!');
          return;
        }
        this.$store.dispatch('register', {
          name: this.name,
          email: this.email,
          password1: this.password1,
          password2: this.password2
        });
      }

      // Сброс значений полей после отправки формы
      this.username = '';
      this.password = '';
      this.email = '';
      this.password1 = '';
      this.password2 = '';

      // Редирект на главную страницу после успешного логина или регистрации
      if (this.$store.getters.isLoggedIn) {
        this.$router.push('/');
      }
    },
    toggleMode() {
      // Переключение между режимами логина и регистрации
      this.isLoginMode = !this.isLoginMode;
    }
  },
  components: {AppNavbar}
};
</script>

<template>
  <body class="container-fluid">
  <AppNavbar/>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="login-form">
      <div class="toggle-buttons">
        <button class="btn btn-secondary" @click="toggleMode" :class="{ '': isLoginMode }" :disabled="isLoginMode">
          LogIn
        </button>
        <button class="btn btn-secondary" @click="toggleMode" :class="{ 'btn-primary': !isLoginMode }"
                :disabled="!isLoginMode">SignUp
        </button>
      </div>
      <form @submit="handleSubmit">
        <template v-if="isLoginMode">
          <div class="mb-3">
            <label for="username" class="form-label">E-mail</label>
            <input type="text" id="username" v-model="username" class="form-control" placeholder="Your email" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" placeholder="Your password"
                   required>
          </div>
          <button class="btn btn-primary" type="submit">LogIn</button>
        </template>
        <template v-else>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input type="text" id="email" v-model="email" class="form-control" placeholder="Your email" required>
          </div>
          <div class="mb-3">
            <label for="password1" class="form-label">Password</label>
            <input type="password" id="password1" v-model="password1" class="form-control" placeholder="Your password"
                   required>
          </div>
          <div class="mb-3">
            <label for="password2" class="form-label">Confirm Password</label>
            <input type="password" id="password2" v-model="password2" class="form-control"
                   placeholder="Confirm password" required>
          </div>
          <button class="btn btn-primary" type="submit">SignUp</button>
        </template>
      </form>
    </div>
  </div>
  </body>
</template>

<style scoped>
.toggle-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 50%;
  max-width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
</style>