<template>
  <router-view name="Header" class="header" />
  <router-view class="body" />
  <router-view name="Menu" />
</template>

<style lang="scss" >
*, *::before, *::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  min-width: 360px;
  font-family: 'Montserrat';
}
#app {
  min-height: calc(100vh - 4rem);
  color: #2a2a2a;
}
</style>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.body {
  position: relative;
  margin-top: 4rem;
}
</style>
