<template>
  <div id="app">
    <HelloWorld msg=""/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
body {
    padding: 0;
    margin: 0;
}
html, body, #app {
    height: 100%;
}
</style>
