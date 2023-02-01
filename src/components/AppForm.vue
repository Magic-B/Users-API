<template lang='pug'>
form(@submit.prevent='formSubmit')
  .grid
    AppInput(label='Name' v-model='v$.name.$model' :error='v$.name.$errors')
    AppInput(label='Username' v-model='v$.username.$model' :error='v$.username.$errors')
    AppInput(label='Email' v-model='v$.email.$model' :error='v$.email.$errors')
    AppInput(label='Phone' v-model='v$.phone.$model' :error='v$.phone.$errors')
    AppInput(label='Website' v-model='v$.website.$model' :error='v$.website.$errors')
    AppInput(label='Company' v-model='v$.company.name.$model' :error='v$.company.$errors')
    AppInput(label='City' v-model='v$.address.city.$model' :error='v$.address.city.$errors')
    AppInput(label='Street' v-model='v$.address.street.$model' :error='v$.address.street.$errors')
    .flex
      AppInput(label='Suite' v-model='v$.address.suite.$model' :error='v$.address.suite.$errors')
      AppInput(label='Zipcode' v-model='v$.address.zipcode.$model' :error='v$.address.zipcode.$errors')
  AppButton(:loading='loading') Create User
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import useVuelidate from '@vuelidate/core'
import { helpers, required, minLength, email, numeric, maxLength, url } from '@vuelidate/validators'
import type { PropType } from 'vue'
import type { IUser } from '@/types/interface'
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

export default defineComponent({
  components: {
    AppInput, AppButton
  },
  props: {
    formData: {
      type: Object as PropType<IUser>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  setup(props, ctx) {
    const { formData } = toRefs(props)

    const rules = computed(() => ({
      name: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
      },
      username: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
      },
      email: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        email: helpers.withMessage('Некорректная почта', email)
      },
      phone: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        numeric: helpers.withMessage('Номер не может быть написан буквами', numeric),
        maxLength: helpers.withMessage('Введите корректный номер', maxLength(11)),
        minLength: helpers.withMessage('Введите корректный номер', minLength(11))
      },
      website: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        url: helpers.withMessage('Введите корректныую ссылку', url)
      },
      company: {
        name: {
          required: helpers.withMessage('Поле не может быть пустым', required),
          minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
        }
      },
      address: {
        city: {
          required: helpers.withMessage('Поле не может быть пустым', required),
          minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
        },
        street: {
          required: helpers.withMessage('Поле не может быть пустым', required),
          minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
        },
        suite: {
          required: helpers.withMessage('Поле не может быть пустым', required),
          minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3))
        },
        zipcode: {
          required: helpers.withMessage('Поле не может быть пустым', required),
          minLength: helpers.withMessage('Минимальная длина: 3 символа', minLength(3)),
          numeric: helpers.withMessage('Zipcode должен содержать цифры', numeric)
        }
      }
    }))

    const v$ = useVuelidate(rules, formData)

    const formSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (isValid) {
        ctx.emit('formSubmit', formData)
      }
    }

    return {
      v$,
      formSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 20px;
  margin-top: 50px;
  margin-bottom: 55px;

  .flex {
    gap: 0 20px;
  }
}
</style>
