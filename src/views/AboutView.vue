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
  <dive>
    <AppNavbar class="fixed-top"/>
    <div class="body mt-5">
      <h3>About Todo App</h3>
      <a>Description here</a>
    </div>
  </dive>
</template>

<style scoped>
.body {
  padding-top: 30px;
  margin: 10px;
}
</style>