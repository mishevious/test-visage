<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card'
})
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid rgba(63, 61, 86, 0.15);
  box-shadow: .5rem 3rem 4rem rgba(63, 61, 86, 0.08);
  border-radius: .5rem;
  padding: 2rem 1.5rem;
}
</style>
