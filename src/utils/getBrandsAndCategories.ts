import { apiClient } from '@/lib/axios'

export const getBrandsAndCategories = async () => {
  const response = await apiClient.get('/brand-category')
  const data = await response.data

  return data
}
