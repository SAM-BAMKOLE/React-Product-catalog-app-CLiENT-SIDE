import { type AxiosResponse } from 'axios'
import { apiClient } from '@/lib/axios'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(
    localStorage.getItem('product-catalog-token')
      ? JSON.parse(localStorage.getItem('product-catalog-token')!)
      : null
  )
  const user = ref(null)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('product-catalog-token', JSON.stringify(newToken))
  }

  const removeToken = () => {
    token.value = null
    localStorage.removeItem('product-catalog-token')
  }

  const login = async (credentials: {
    email: string
    password: string
  }): Promise<AxiosResponse<any, any>> => {
    try {
      const response = await apiClient.post(
        import.meta.env.VITE_API_URL + '/auth/login',
        credentials
      )
      if (response.status == 200) {
        setToken(response.data.token)
        // await fetchUser();
        user.value = response.data.identity
      }
      return response
    } catch (error: any) {
      console.log(error)
      return error.response
    }
  }

  const logout = () => {
    removeToken()
    user.value = null
  }

  // const fetchUser = async ()=> {
  //     try {

  //     } catch (error) {
  //         console.log(error.message)
  //         logout()
  //     }
  return { token, user, login, logout, setToken, removeToken }
})
