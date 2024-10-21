import { apiClient } from '@/lib/axios'

interface ProductToUpload {
  product_name: string
  product_description: string
  price: string
  image: File | undefined | null
  category_id: string
  brand_id: string
}

export const addProduct = async (product: ProductToUpload) => {
  const formData = new FormData()

  formData.append('product_name', product.product_name)
  formData.append('product_description', product.product_description)
  formData.append('price', product.price)
  formData.append('image', product.image!)
  formData.append('brand_id', product.brand_id)
  formData.append('category_id', product.category_id)

  try {
    const response = await apiClient.post('/product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log(await response.data)
  } catch (e) {
    console.log(e)
  }
}
