<script lang="ts" setup>
import { useProductStore } from '@/stores/product'
import type { BrandType } from '@/types/brands'
import type { CategoryType } from '@/types/categories'
import { addProduct } from '@/utils/addProduct'
import { onMounted, ref } from 'vue'

const serverRoot = import.meta.env.VITE_SERVER_ROOT

const loading = ref(false)
const brands = ref<BrandType[]>([])
const categories = ref<CategoryType[]>([])
const form = ref({
  product_name: '',
  product_description: '',
  price: '',
  image: undefined,
  category_id: null,
  brand_id: null
})
const { getBrands, getCategories } = useProductStore()

const handleSubmit = async () => {
  loading.value = true
  await addProduct(form.value)
  loading.value = false
}

const imagePreview = ref<string | ArrayBuffer | null>(null)

const handleFileChange = (e: Event) => {
  const file = e.target!.files[0]
  form.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target!.result
  }
  reader.readAsDataURL(file)
}

onMounted(async () => {
  brands.value = await getBrands()
  categories.value = await getCategories()
})
</script>

<template>
  <div class="container flex items-center justify-center min-h-screen px-4 pt-28 pb-10">
    <div class="w-full max-w-3xl">
      <h1 class="text-accent font-extrabold text-2xl md:text-3xl mb-3 text-center">
        Add a new Product
      </h1>
      <form class="px-3 py-4 rounded-xl shadow-xl" @submit.prevent="handleSubmit">
        <label for="product_name" class="label font-semibold">Role:</label>
        <input
          type="text"
          v-model="form.product_name"
          id="product_name"
          class="input input-sm md:input-md bg-neutral-100 w-full focus:outline-none focus:border-0 focus:border-b focus:border-accent"
          placeholder="product name"
        />
        <label for="product_description" class="label font-semibold">Description:</label>
        <textarea
          id="product_description"
          v-model="form.product_description"
          class="resize-none textarea bg-neutral-100 w-full h-16 focus:outline-none focus:border-0 focus:border-b focus:border-accent"
          placeholder="Real givenchi black boots for men.."
        ></textarea>
        <label for="product_price" class="label font-semibold">Product price:</label>
        <input
          type="text"
          id="product_price"
          v-model="form.price"
          class="input input-sm md:input-md bg-neutral-100 w-full focus:outline-none focus:border-0 focus:border-b focus:border-accent"
          placeholder="$35.5.."
        />
        <label for="product_brand" class="label font-semibold">Product brand:</label>
        <select class="select w-full bg-neutral-100" v-model="form.brand_id">
          <option selected disabled>Pick the product's brand</option>
          <option v-for="brand in brands" :value="brand.id" :key="brand.id">
            {{ brand.brand_name }}
          </option>
        </select>
        <label for="product_brand" class="label font-semibold">Product category:</label>
        <select class="select w-full bg-neutral-100" v-model="form.category_id">
          <option selected disabled>Select the product's category</option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.category_name }}
          </option>
        </select>
        <label for="product_image" class="label font-semibold">Product image:</label>
        <input
          accept="image/jpeg, image/png, image/gif"
          type="file"
          @change="handleFileChange"
          id="product_image"
          class="file-input file-input-sm w-full max-w-xs focus:border-o focus:outline-none"
        />
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Image preview"
          class="mt-6 h-16 md:h-20"
          loading="lazy"
        />
        <button class="btn btn-accent btn-sm md:btn-md w-full mt-5" :disabled="loading">
          {{ loading ? 'Adding product...' : 'Add product' }}
        </button>
      </form>
    </div>
  </div>
</template>
