<template lang='pug'>
.card.flex.column.justify-center
  .subtitle {{ info.name }}
  .user-name.mt-sm @{{ info.username }}
  .mt-xl {{ info.email }}
  .mt-sm {{ info.phone }}
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
  width: 100%;
  height: 160px;
  padding: 0 25px;
  color: #444444;

  background: #FFFFFF;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .user-name {
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
