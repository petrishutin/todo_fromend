<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog_content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  name: 'app-dialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    hideDialog() {
      this.$emit('update:show', false)
    }
  }
}
</script>


<style scoped>
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.dialog_content {
  width: 50%;
  height: 50%;
  background-color: white;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}
</style>