<script lang="ts" setup>
import oml2d from './components/icon/oml2d.vue'
import LeftMsg from './components/Left-msg.vue'
import RightMsg from './components/Right-msg.vue'
</script>
<template>
  <oml2d></oml2d>
  <div class="container">
    <div class="left">
      <LeftMsg />
    </div>
    <div class="right">
      <RightMsg />
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-image: url('@/assets/bg-image-可塑性记忆.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  /* filter: blur(25px); */
}

.left {
  width: 30%;
  height: 100%;
  float: left;
  /* background: transparent; */
}

.right {
  width: 70%;
  height: auto;
  float: right;
  background: transparent;
}
</style>