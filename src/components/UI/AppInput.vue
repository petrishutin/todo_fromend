<template>
    <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>


<script>
export default {
    name: 'app-input',
    props: {
        modelValue: [String, Number],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>


<style scoped>
.input {
    width: auto;
    border: 2px solid #070760;
    padding: 10px;
    margin-top: 15px;
}

</style>