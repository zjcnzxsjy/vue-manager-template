<template>
  <div class="skeleton-wrapper">
    <div class="bouncing-loader">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
};
</script>

<style lang="scss" scoped>
@keyframes bouncing-loader {
  to {
    opacity: 0.1;
    transform: translate3d(0, -1rem, 0);
  }
}
.skeleton-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  user-select: none;
  z-index: 9999;
  overflow: hidden 
}
.bouncing-loader {
  display: flex;
  justify-content: center;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.bouncing-loader > div {
  width: 1rem;
  height: 1rem;
  margin: 3rem 0.2rem;
  background: #8385aa;
  border-radius: 50%;
  animation: bouncing-loader 0.6s infinite alternate;
}
.bouncing-loader > div:nth-child(2) {
  animation-delay: 0.2s;
}
.bouncing-loader > div:nth-child(3) {
  animation-delay: 0.4s;
}
</style>