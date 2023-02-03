<template lang='pug'>
.container
  AppLoader(v-if='loading' big-loader loader-color-black)
  template(v-else)
    div.flex.between.items-center.full-width
      .title Users
      AppButton(@click='goToCreateView') Create User
    div.grid(v-if='users' )
      AppCard(v-for='user in users' :key='user.email' :info='user' @click='goToUserView(user.id)')
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { IUsers } from '../types/interface'
import { backend } from '@/api'
import { useNotification } from '@kyvg/vue3-notification'
import AppButton from '@/components/AppButton.vue'
import AppCard from '@/components/AppCard.vue'
import AppLoader from '@/components/AppLoader.vue'

export default defineComponent({
  components: {
    AppButton, AppCard, AppLoader
  },
  setup () {
    const users = ref<IUsers>({} as IUsers)
    const router = useRouter()
    const loading = ref(true)
    const { notify } = useNotification()

    const goToCreateView = (): void => {
      router.push({ name: 'create' })
    }

    const goToUserView = (userId: string): void => {
      router.push({ name: 'user', params: { id: userId } })
    }

    onMounted(async (): Promise<void> => {
      try {
        const response = await backend.getUsers()
        users.value = response.data
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
    })

    return {
      users,
      loading,
      goToUserView,
      goToCreateView
    }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px 20px;
  margin-top: 50px;
}
</style>
