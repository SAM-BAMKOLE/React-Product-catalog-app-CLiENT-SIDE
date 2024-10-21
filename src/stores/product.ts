import { apiClient } from '@/lib/axios'
import type { BrandType } from '@/types/brands'
import type { CategoryType } from '@/types/categories'
import type { ProductType } from '@/types/product'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref<ProductType[]>([])
  const brands = ref<BrandType[]>([])
  const categories = ref<CategoryType[]>([])

  const getProducts = async () => {
    if (products.value?.length > 0) {
      return products.value
    }

    const response = await apiClient.get('/product')
    // return await response.data
    const res = await response.data
    products.value = res[0]
    return res[0]
  }

  const getBrands = async () => {
    if (brands.value.length > 0) {
      return brands.value
    }
    const response = await apiClient.get('/brand')
    const data = await response.data
    brands.value = data
    return data
  }
  const getCategories = async () => {
    if (categories.value.length > 0) {
      return categories.value
    }
    const response = await apiClient.get('/category')
    const data = await response.data
    categories.value = data
    return data
  }

  const filterProducts = async (filter_by: string, value: string) => {
    const response = await apiClient.get('/product/search?' + filter_by + '=' + value)
    const data = await response.data
    return data
  }

  const getSingleProduct = async (productId: string) => {
    const response = await apiClient.get('/product/' + productId)
    const data = await response.data
    return data
  }

  return { getProducts, getBrands, getCategories, filterProducts, getSingleProduct }
})
