<template>
  <div id="app">
    <h3>单色图标（改色）：</h3>
    <svg-icon
      name="app"
      class="test"
      color="red"
      font-size="36px"
      @click="handleClick"
    />
    <svg-icon
      name="dashboard"
      class="test"
      color="skyblue"
      font-size="36px"
    />
    <svg-icon
      name="text-underline"
      color="yellow"
      font-size="36px"
    />

    <h3>单色图标（原色）：</h3>

    <svg-icon
      name="text-de-line-through"
      font-size="36px"
    />

    <svg-icon
      name="delete"
      width="36"
    />

    <h3>多色图标（原色）：</h3>

    <svg-icon
      name="buding"
      font-size="36px"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup () {
    const handleClick = (e) => {
      console.log(e)
    }

    return {
      handleClick
    }
  }
})
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
