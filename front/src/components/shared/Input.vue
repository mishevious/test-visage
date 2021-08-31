<template>
  <div class="input-wrapper">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <div class="error" v-show="error !== ''">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Input',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  emit: ['update:modelValue']
})
</script>

<style lang="scss" scoped>
  .input-wrapper {
    margin-block-start: 1rem;
    margin-block-end: 1rem;

    .error {
      color: $negative;
    }
  }

  input {
    @include input(&);
  }
</style>
