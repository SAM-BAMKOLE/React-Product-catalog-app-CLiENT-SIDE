<script setup lang="ts">
defineProps(['data'])

const serverRoot = import.meta.env.VITE_SERVER_ROOT
console.log(serverRoot)
</script>

<template>
  <article class="card bg-amber-50 shadow-xl">
    <figure>
      <img
        :src="serverRoot + data.image_url"
        alt=""
        class="w-full aspect-video object-cover"
        loading="lazy"
      />
    </figure>
    <div class="card-body">
      <div class="card-title">
        {{ data.product_name }}
        <div class="badge badge-secondary text-nowrap">{{ data.brand_name }}</div>
      </div>
      <legend class="text-xl text-accent font-bold">${{ data.price }}</legend>
      <p class="text-ellipsis">{{ data.product_description }}</p>
      <div class="card-actions">
        <div class="badge badge-outline">{{ data.category_name }}</div>
      </div>
    </div>
  </article>
</template>
