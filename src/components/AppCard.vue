<template lang='pug'>
.card.flex.column.justify-center
  .name {{ info.name }}
  .user-name.mt-sm @{{ info.username }}
  .text.mt-lg {{ info.email }}
  .text.mt-sm {{ info.phone }}
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IUsers } from '@/types/interface'

export default defineComponent({
  props: {
    info: {
      type: Object as PropType<IUsers>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
  width: 380px;
  height: 160px;
  padding: 0 25px;

  background: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .name {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
  }
  .user-name {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
