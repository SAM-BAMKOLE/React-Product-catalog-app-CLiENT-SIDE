<script setup lang="ts">
import { RouterLink } from 'vue-router'
import cushionSofa from '@/assets/images/cushion-sofa.png'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'
import { onMounted, ref } from 'vue'
import type { ProductType } from '@/types/product'
import SkeletonDelay from '@/components/SkeletonDelay.vue'

const { getProducts } = useProductStore()

let products = ref<ProductType[]>([])

const typings = [
  'no 1 store for every day need',
  'every day house provision',
  "quality at it's best"
]

const skeletonRound = [0, 1, 2, 3, 4, 5, 6, 7]

onMounted(async () => {
  const data = await getProducts()
  products.value = data
})
</script>

<template>
  <main>
    <section
      class="bg-gradient-to-b from-accent/50 to-accent text-primary-content rounded-b-[3rem] backdrop-filter"
    >
      <div
        class="container mx-auto min-h-screen md:items-center px-10 flex flex-col md:grid md:grid-cols-2"
      >
        <div class="mt-32 md:mt-0">
          <h1
            class="text-4xl md:text-[40px] font-bold md:leading-[1.3] text-neutral-900 min-h-32 md:min-h-20"
          >
            Maddy's store,
            <VueTyped
              :strings="typings"
              :backSpeed="50"
              :typeSpeed="80"
              :loop="true"
              :showCursor="true"
              class="inline text-primary"
            ></VueTyped>
          </h1>
          <p class="md:text-lg mb-5 text-neutral-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi id odio quaerat sit,
            doloribus expedita nam dolores porro!
          </p>
          <RouterLink to="/about" class="block md:inline-block">
            <button class="w-full btn btn-outline btn-primary md:btn-md">More about us</button>
          </RouterLink>
          <RouterLink to="/products/search" class="block md:inline-block mt-2 md:mt=0 md:ml-3">
            <button class="w-full btn btn-primary md:btn-md">View products</button>
          </RouterLink>
        </div>
        <img
          :src="cushionSofa"
          alt="sofa cushion"
          class="drop-shadow-2xl md:w-4/5 mx-auto self-end"
        />
      </div>
    </section>
    <section>
      <div class="container mx-auto px-5 md:px-10">
        <h3>Latest Products!</h3>
        <section
          v-if="products.length"
          class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 mt-14"
        >
          <ProductCard v-for="item in products" :key="item.id" :data="item" />
        </section>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-7 mt-14" v-else>
          <SkeletonDelay v-for="id in skeletonRound" :key="id" />
        </div>
      </div>
    </section>
  </main>
</template>
