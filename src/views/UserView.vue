<template lang='pug'>
.container
  AppLoader(v-if='loading' big-loader loader-color-black)
  template(v-else)
    .flex
      .title.mr-xl {{ user.name }}
      div @{{ user.username }}
    .grid
      div
        .subtitle Email
        .mt-lg {{ user.email }}
      div
        .subtitle Phone
        .mt-lg {{ user.phone }}
      div
        .subtitle Website
        .mt-lg {{ user.website }}
      div
        .subtitle Company
        .mt-lg {{ user.company.name }}
      div
        .subtitle Address
        .mt-lg {{ user.address.suite }} {{ user.address.street }}, {{ user.address.city }}, {{ user.address.zipcode }}
</template>

<script lang='ts'>
import { defineComponent, ref, toRefs } from 'vue'
import AppLoader from '@/components/AppLoader.vue'
import { backend } from '@/api'
import { useNotification } from '@kyvg/vue3-notification'
import type { IUser } from '@/types/interface'

export default defineComponent({
  components: {
    AppLoader
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { id } = toRefs(props)
    const user = ref<IUser>({} as IUser)
    const loading = ref(true)
    const { notify } = useNotification()

    const getUser = async (): Promise<void> => {
      try {
        const response = await backend.getUser(id.value)
        user.value = response.data
      } catch (err) {
        if (err instanceof Error) {
          notify({
            title: err.message,
            type: 'error',
            duration: 1000,
            speed: 1000
          })
        }
      } finally {
        loading.value = false
      }
    }

    getUser()

    return {
      user,
      loading
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px 20px;
  margin-top: 50px;
}

@media (max-width: $mobile) {
  .flex {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
