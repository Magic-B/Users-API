<template lang='pug'>
.container
  .title Create User
  AppForm(:form-data='form' @formSubmit='onSubmit' :loading='loading')
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotification } from '@kyvg/vue3-notification'
import type { IUser } from '@/types/interface'
import { backend } from '@/api'
import AppForm from '@/components/AppForm.vue'

export default defineComponent({
  components: {
    AppForm
  },
  setup () {
    const router = useRouter()
    const loading = ref(false)
    const { notify } = useNotification()
    const form = ref<IUser>({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: {
        name: ''
      },
      address: {
        city: '',
        street: '',
        suite: '',
        zipcode: ''
      }
    })

    const onSubmit = async (formValue: IUser): Promise<void> => {
      console.log('hello world')
      loading.value = true
      try {
        await backend.createUser(formValue)
        notify({
          title: 'User успешно создан',
          type: 'success',
          duration: 1000,
          speed: 1000
        })
        setTimeout(() => {
          router.push({ name: 'users' })
        }, 2000)
      } catch (err) {
        if (err instanceof Error) {
          notify({
            title: `${err.message}`,
            type: 'error',
            duration: 1000,
            speed: 1000
          })
        }
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      loading,
      onSubmit,
      alert
    }
  }
})
</script>
