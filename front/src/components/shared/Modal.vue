<template>
  <teleport to="#app">
    <div v-if="value" class="modal">
      <div class="card">
        <div class="header">
          <div class="header-title">
            <slot name="header">
              Modal title
            </slot>
          </div>
          <div class="header-close">
            <div class="material-icons button-close" @click="closeModal()" >
              close
            </div>
          </div>
        </div>
        <div class="content">
          <slot name="content">
            Modal content
          </slot>
        </div>
        <div class="footer">
          <slot name="footer">
            Modal footer
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'Modal',
  components: {
  },
  emits: ['input', 'after-open', 'after-close'],
  props: {
    value: Boolean
  },
  setup (props, { emit }) {
    const closeModal = () => {
      emit('input', false)
    }

    watch(() => props.value, () => {
      if (props.value) {
        emit('after-open')
      } else {
        emit('after-close')
      }
    })

    return {
      closeModal
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  z-index: 1000;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal .card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 50vw;
  max-height: 100vh;
  border-radius: 0.5em;
  overflow: hidden;
  transition: 0.2s;
}

.modal .header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0.5em 0.5em 0.5em;
  font-size: 1.4em;
  background: $primary-color;
  color: white;
}

.modal .footer {
  width: 100%;
  padding: 1em;
}

.modal .button-close {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
}

.modal .header-title {
  padding-right: 1em;
}
.modal .content {
  width: 100%;
  padding: 2em 2em;
  overflow: auto;
}

@media (max-width: 1200px) {
  .modal .card {
    width: 76vw;
  }
}

@media (max-width: 600px) {
  .modal .card {
    width: 99vw;
    height: 99vw;
  }
}
</style>
