<template>
  <div class="header">
    <Button icon="menu" flat @click="toggle" />
    <Button icon="account_circle" class="profile" flat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/shared/Button.vue'
import useMenu from '@/components/layout/menu/useMenu'

export default defineComponent({
  name: 'Header',
  components: {
    Button
  },
  setup () {
    return {
      ...useMenu()
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $header-height;
  background-color: $primary-color;
  color: white;

  .profile::v-deep .material-icons {
    font-size: 2rem;
  }
}
</style>
