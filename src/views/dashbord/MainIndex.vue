<template>
  <div class='wrapper'>
    <hs-skeleton
      :loading='true'
      :avatar='false'
      avatarSize='large'
      avatarShape='circle'
      active>
      1111
    </hs-skeleton>
  </div>
</template>
<script>
// import skeleton from '@/components/skeleton/Skeleton';
export default {
  name: 'MainIndex',
  // components: {
  //   skeleton
  // }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background: #FFF;
}
</style>
