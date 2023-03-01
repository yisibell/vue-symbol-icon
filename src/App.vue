<template>
  <div id="app">
    <h3>单色图标：</h3>
    <svg-icon
      icon-class="app"
      class="test"
      color="red"
      font-size="36px"
    />
    <svg-icon
      icon-class="dashboard"
      class="test"
      color="skyblue"
      font-size="36px"
    />
    <svg-icon
      icon-class="text-underline"
      color="yellow"
      font-size="36px"
    />
    <svg-icon
      icon-class="text-de-line-through"
      font-size="36px"
    />

    <h3>多色图标：</h3>

    <svg-icon
      icon-class="buding"
      font-size="36px"
    />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
