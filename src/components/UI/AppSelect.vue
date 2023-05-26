<template>
  <select class="app-select" :value="modelValue" @change="changeOption">
    <option disabled value=""></option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">{{option.name}}</option>
  </select>
</template>

<script>
export default {
  name: 'app-select',
  props: {
    modelValue: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.app-select {
  width: auto;
  border: 2px solid #070760;
  padding: 10px;
  margin-top: 15px;
}
</style>