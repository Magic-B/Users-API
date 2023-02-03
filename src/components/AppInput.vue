<template lang='pug'>
div
  div(v-if='label') {{ label }}
  input.input(v-model="value" :class='{error_input: error.length}' :placeholder='placeholder')
  transition-group(name='error' tag='ul')
    li.error-message(v-if='error.length') {{ error[0].$message }}
</template>

<script>
import { computed } from 'vue'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: [String, Number, null],
      required: true,
      default: null
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    error: {
      type: Array,
      required: false
    }
  },
  setup (props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    return {
      value
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  all: unset;
  width: 100%;
  padding: 0px 20px;
  margin-top: 10px;
  height: 40px;
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
.error_input {
  border: 1px solid red;
}
.error-message {
  position: absolute;
  display: flex;
  justify-content: right;
  list-style: none;
  right: 0;
  left: 0;
  color: red;
}

.error-move, /* apply transition to moving elements */
.error-enter-active,
.error-leave-active {
  transition: all 0.5s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
