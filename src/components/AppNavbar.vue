<script>
export default {
  name: 'AppNavbar'
}
</script>
<template>
  <header class="header fixed-top d-flex align-items-center">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
      <b class="logo d-flex align-items-center">
        TODO APP
      </b>
      <i class="bi bi-list mobile-nav-toggle"></i>
    </div>
    <nav class="align-items-end header-nav ms-auto justify-content-end">
      <div class="d-flex">
        <button class="btn btn-primary me-2" @click="$router.push('/')">HOME</button>
        <button class="btn btn-primary" @click="$router.push('/login')">LOGIN</button>
      </div>
    </nav>
  </header>
</template>
<style scoped>
.header-nav {
  margin-right: 20px; /* Добавьте желаемый отступ справа */
  margin-bottom: 10px; /* Добавьте желаемый отступ снизу */
}
</style>