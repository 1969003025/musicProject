<template>
  <div id="app">
	<new_file></new_file>
  </div>
</template>

<script>
import new_file from './components/new_file.vue'

export default {
  name: 'app',
  components: {
    new_file
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
