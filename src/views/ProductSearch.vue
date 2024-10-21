<script setup lang="ts">
import LoadingSpinnerDelay from '@/components/LoadingSpinnerDelay.vue'
import type { BrandType } from '@/types/brands'
import type { CategoryType } from '@/types/categories'
import { onMounted, ref } from 'vue'

import { useProductStore } from '@/stores/product'
import type { ProductType } from '@/types/product'
import ProductCard from '@/components/ProductCard.vue'
import SkeletonDelay from '@/components/SkeletonDelay.vue'

const { getBrands, getCategories, getProducts, filterProducts } = useProductStore()

const products = ref<ProductType[]>([])
const selectList = ref<BrandType[] | CategoryType[]>([])

const radioSelected = ref<string>()

const pageLoading = ref<boolean>(false)

const skeletonRound = [0, 1, 2, 3, 4, 5, 6, 7]

const handleChange = async (e: Event) => {
  pageLoading.value = true
  let selected = e.target!.value
  radioSelected.value = selected
  if (selected == 'brand') selectList.value = await getBrands()
  else if (selected == 'category') selectList.value = await getCategories()
  else selectList.value = []
  products.value = await getProducts()
  pageLoading.value = false
}

const handleSelect = async (e: Event) => {
  pageLoading.value = true
  const filteredProducts: ProductType[] = await filterProducts(
    radioSelected.value!,
    e.target!.value
  )
  products.value = filteredProducts
  pageLoading.value = false
}

onMounted(async () => {
  pageLoading.value = true
  products.value = await getProducts()
  pageLoading.value = false
})
</script>
<template>
  <div class="mt-28">
    <div class="container mx-auto px-5">
      <section class="">
        <!-- flex justify-between items-center flex-wrap gap-3 -->
        <h1 class="text-5xl font-medium text-accent mb-3">Products List</h1>
        <div class="flex flex-wrap md:items-center gap-4">
          <div
            class="flex gap-4 w-full md:max-w-sm items-center card card-side shadow-sm px-6 py-3"
          >
            <p class="font-medium mr-2">Filter By:</p>

            <fieldset class="flex gap-1">
              <input
                type="radio"
                name="filter"
                id="all"
                value="all"
                @change="handleChange"
                checked
              />
              <label class="label" for="all">All:</label>
            </fieldset>
            <fieldset class="flex gap-1">
              <input type="radio" name="filter" id="brand" value="brand" @change="handleChange" />
              <label class="label" for="brand">Brand:</label>
            </fieldset>
            <fieldset class="flex gap-1">
              <input
                type="radio"
                name="filter"
                id="category"
                value="category"
                @change="handleChange"
              />
              <label class="label" for="category">Category:</label>
            </fieldset>
          </div>
          <select
            id=""
            class="select w-full md:max-w-sm focus:outline-none card shadow-sm px-6 py-3"
            @change="handleSelect"
            :disabled="pageLoading"
          >
            <option selected>
              {{
                radioSelected == 'brand'
                  ? 'Select one Brand'
                  : radioSelected == 'category'
                    ? 'Select one Category'
                    : ''
              }}
            </option>
            <optgroup v-if="selectList.length">
              <option
                v-for="item in selectList"
                :value="item.brand_name ?? item.category_name"
                :key="item.id"
              >
                {{ item.brand_name ?? item.category_name }}
              </option>
            </optgroup>
          </select>
        </div>
      </section>
      <div v-if="products.length" class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-14">
        <ProductCard v-for="product in products" :key="product.id" :data="product" />
      </div>
      <div
        v-else-if="products.length < 1 && pageLoading == true"
        class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-14"
      >
        <SkeletonDelay v-for="id in skeletonRound" :key="id" />
      </div>
      <div class="" v-else><p class="font-500">No products</p></div>
    </div>
  </div>
</template>
