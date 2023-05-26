<script>
import AppNavbar from "@/components/AppNavbar.vue";

export default {
  components: {AppNavbar},
  setup() {
    return {
    }
  }
}
</script>

<template>
  <div>
    <AppNavbar class="fixed-top"/>
    <div class="body mt-5">
      <h3>About Todo App</h3>
      <a>Description here</a>
    </div>
  </div>
</template>

<style scoped>
.body {
  padding-top: 30px;
  margin: 10px;
}
</style>