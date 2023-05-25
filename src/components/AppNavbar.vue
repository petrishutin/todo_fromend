<script>
import { useStore } from 'vuex';
export default {
  name: 'AppNavbar',
  setup() {
    const store = useStore()
    return {
        isLoggedIn: store.getters['isLoggedIn'],
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
<template>
  <header class="fixed-top header fixed-top d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <b class="logo d-flex align-items-center">
        TODO APP
      </b>
      <i class="bi bi-list mobile-nav-toggle"></i>
    </div>
    <nav v-if="isLoggedIn" class="align-items-end header-nav ms-auto justify-content-end">
      <div class="d-flex">
        <button class="btn btn-primary me-2" @click="$router.push('/')">HOME</button>
        <button class="btn btn-primary me-2" @click="$router.push('/about')">ABOUT</button>
        <button class="btn btn-primary me-2" @click="logout">LOGOUT</button>
      </div>
    </nav>
    <nav v-else class="align-items-end header-nav ms-auto justify-content-end">
      <div class="d-flex">
        <button class="btn btn-primary me-2" @click="$router.push('/about')">ABOUT</button>
        <button class="btn btn-primary" @click="$router.push('/login')">LOGIN</button>
      </div>
    </nav>
    <slot></slot>
  </header>
</template>
<style scoped>
.header-nav {
  margin-right: 20px; /* Добавьте желаемый отступ справа */
  margin-bottom: 10px; /* Добавьте желаемый отступ снизу */
}
</style>