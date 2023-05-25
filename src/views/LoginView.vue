<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      });
      this.username = '';
      this.password = '';
      this.$router.push('/');
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
      <h2>LogIn</h2>
      <form @submit="handleSubmit">
        <div class="mb-3">
          <label for="username" class="form-label">E-mail</label>
          <input type="text" id="username" v-model="username" class="form-control" placeholder="Your email" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" placeholder="Your password"
                 required>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </div>
  </body>
</template>

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