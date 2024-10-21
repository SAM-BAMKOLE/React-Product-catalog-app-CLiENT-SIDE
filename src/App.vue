<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
const { token: userToken } = useAuthStore()
</script>

<template>
  <header class="absolute top-2 left-0 flex flex-wrap items-center container mx-auto py-4 px-5">
    <img alt="Vue logo" class="" src="@/assets/logo.svg" width="50" height="125" />
    <RouterLink to="/" class="ml-2">Maddy's Store</RouterLink>

    <nav class="ml-auto space-x-2">
      <RouterLink v-if="userToken" to="/products/new" class="link link-hover font-medium"
        >Add new Product</RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
