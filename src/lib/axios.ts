import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export function setupAxiosnterceptors(authStore) {
  // intercept all requests and add token
  apiClient.interceptors.request.use(
    (config) => {
      const token = authStore.token

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: any) => Promise.reject(error)
  )

  // response interceptor to handle token expiration
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authStore.logout()
      }
      return Promise.reject(error)
    }
  )
}
