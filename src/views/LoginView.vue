<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({ email: '', password: '' })
const formErrors = ref({ email: [], password: [], message: '' })
const { login } = useAuthStore()
const router = useRouter()
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  const response = await login(form.value)
  if (response.status === 200) {
    router.push('/')
  } else {
    if (response.data.errors) {
      formErrors.value.email = response.data.errors.email
      formErrors.value.password = response.data.errors.password
    } else {
      formErrors.value.email = []
      formErrors.value.password = []
      formErrors.value.message = response.data.message
    }
    loading.value = false
  }
}
</script>

<template>
  <div class="container mx-auto min-h-screen flex items-center justify-center">
    <div class="w-full max-w-2xl px-4">
      <p v-if="formErrors.message" class="text-red-500 mb-10">{{ formErrors.message }}</p>
      <h1 class="text-accent font-extrabold text-2xl md:text-3xl mb-2">Log in to Maddie's Store</h1>
      <form class="px-3 py-4 rounded-xl shadow-xl" @submit.prevent="handleSubmit">
        <label for="email" class="label font-semibold">Role:</label>
        <input
          type="text"
          id="email"
          v-model="form.email"
          class="input input-sm md:input-md bg-neutral-100 w-full focus:outline-none focus:border-0 focus:border-b focus:border-accent"
          placeholder="youremail@mail.com"
        />
        <small v-if="formErrors.email"
          ><ul class="text-red-500">
            <li v-for="(err, index) in formErrors.email" :key="index">{{ err }}</li>
          </ul></small
        >
        <label for="password" class="label font-semibold">Password:</label>
        <input
          type="text"
          id="password"
          v-model="form.password"
          class="input input-sm md:input-md bg-neutral-100 w-full focus:outline-none focus:border-0 focus:border-b focus:border-accent"
          placeholder="your-very-secure-password.."
        />
        <small v-if="formErrors.password"
          ><ul class="text-red-500">
            <li v-for="(err, index) in formErrors.password" :key="index">{{ err }}</li>
          </ul></small
        >
        <button class="btn btn-accent btn-sm md:btn-md w-full mt-5" :disabled="loading">
          {{ loading ? 'Please hold on...' : 'Log in' }}
        </button>
      </form>
    </div>
  </div>
</template>
