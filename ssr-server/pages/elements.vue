<template>
  <div class="components-container">
    <h2 class="title">
      Elements
    </h2>
    <div class="wrap">
      <p class="brief brief-margin">VueCodes Button</p>
      <dp-button/>
    </div>
  </div>
</template>
<script>
export default {
  name:'elements-page',
  beforeCreate() {
    const Button = require('src/stories/elements/button/button').default
    this.$options.components['dp-button'] = Button
  }
}
</script>

<style>
.wrap {
  padding: 20px;
  border-bottom: 1px dotted #ccc;
  position: relative;
}

p.brief {
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 0;
}

p.brief-margin {
  margin-bottom: 15px;
}

.subtitle,
.brief {
  font-weight: 300;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.components-container {
  text-align: left;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
}
</style>
