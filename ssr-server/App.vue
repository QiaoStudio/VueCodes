<template>
  <div id="app">
    <div class="left-menu">
      <router-link to="/elements" class="router-link">Elements</router-link>
    </div>
    <div class="main-view">
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
.left-menu {
  flex: 0 0 234px;
  border-right: 1px solid #ccc;
  text-align: center;
  padding-top: 30px
}
.router-link {
  display: block;
  padding: 5px;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid #ccc;
  font-size: 20px;
  padding: 5px 20px 5px 20px;
  margin-left: 10px;
  margin-right: 10px;
}
.main-view {
  flex: 1 1 auto;
  max-height: 100vh;
  overflow-y: auto;
  padding: 30px;
}

</style>
