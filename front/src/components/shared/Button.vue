<template>
  <button :class="{ flat, neutral: color === 'neutral', negative: color === 'negative', positive: color === 'positive', 'not-active': notActive }" :disabled="disable">
      <span v-if="icon" class="material-icons" >
        {{ icon }}
      </span>

    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    icon: {
      type: String,
      required: false,
      default: ''
    },
    flat: {
      type: Boolean,
      required: false,
      default: false
    },
    color: {
      type: String,
      required: false
    },
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    notActive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $button-background-color;
  color: $button-text-color;
  @include input(&);
  cursor: pointer;
  transition: 0.2s;

  &:disabled {
    background-color: $button-background-color-disable;
    border-color: $button-background-color-disable;
  }

  &.negative {
      background-color: $negative;
      border: $negative;
  }
  &.positive {
      background-color: $positive;
      border: $positive;
  }
  &.neutral {
      background-color: $neutral;
      color: $primary-text;
      border: $neutral;
  }
  &.not-active {
    background-color: $neutral;
    border: $neutral;
  }
}
</style>
