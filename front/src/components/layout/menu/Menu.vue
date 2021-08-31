<template>
  <transition name="left">
    <div v-if="isVisible" class="menu">
      <Button class="close-button" icon="close"  @click="toggle" flat />
      <div class="items">
        <router-link v-for="route in routes" class="item" :key="route.name" :to="route.path">
          <span @click="toggle">
            {{ route.text }}
          </span>
        </router-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import useMenu from './useMenu'
import Button from '@/components/shared//Button.vue'

export default defineComponent({
  name: 'Menu',
  components: {
    Button
  },
  setup () {
    const { isVisible, toggle } = useMenu()

    const routes = [
      {
        name: "Home",
        path: "/",
        text: "Candidate Profiles"
      },
    ]

    return {
      isVisible,
      toggle,
      routes,
    }
  }
})
</script>

<style lang="scss" scoped>
.menu {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: $primary-color;
  padding-top: 5rem;

  @media (min-width: $large) {
    width: 30vw;
    max-width: 14rem;
  }

  .close-button {
    position: absolute;
    right: 0;
    top: 0;
  }

  .items {
    display: flex;
    flex-direction: column;

    .item {
      text-decoration: none;
      color: white;
      margin: 1rem;

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }
}

.left-enter-active, .left-leave-active {
  transition: all .3s ease-in;
}

.left-enter-from,
.left-leave-to {
  transform: translateX(-100%);
}
</style>
