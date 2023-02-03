<template lang='pug'>
button.btn(type='submit')
  slot(v-if='!loading') click
  AppLoader(v-else)
</template>

<script>
import AppLoader from '@/components/AppLoader.vue'

export default {
  props: ['loading'],
  components: {
    AppLoader
  }
}
</script>

<style lang="scss" scoped>
.btn {
  all: unset;
  cursor: pointer;
  min-width: 80px;
  height: 40px;
  padding: 0 16px;
  text-align: center;
  border: 1px solid #000000;
  transition: all .5s;
}
.btn:hover {
  background: #000000;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
}
</style>
