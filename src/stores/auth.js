import { defineStore } from 'pinia'
import { api } from '../boot/axios'
import { Notify } from 'quasar'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    error: null,
  }),

  actions: {
    async login(email, password) {
      this.error = null

      try {
        const { data: dataLogin } = await api.post('/auth/login', { email, password })
        this.token = dataLogin.access_token
        this.userId = dataLogin.userId
        localStorage.setItem('token', dataLogin.access_token)
        localStorage.setItem('userId', dataLogin.userId)
        return dataLogin.access_token
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Erro desconhecido'
      }
    },

    async register(name, email, password) {
      this.error = null

      try {
        const { data: dataRegister } = await api.post('/auth/register', { name, email, password })
        console.log(dataRegister)
        if (dataRegister.access_token) {
          this.token = dataRegister.access_token
          localStorage.setItem('token', dataRegister.access_token)
        }
        console.log('passou aquiii' + dataRegister)

        return dataRegister.access_token
      } catch (err) {
        this.error = err.response?.data?.message || err.message || 'Erro desconhecido'
        console.log(this.error)
        Notify.create({
          message: this.error,
          color: 'negative',
          position: 'bottom',
        })
      }
    },

    async logout() {
      this.token = null
      localStorage.removeItem('token')
      this.userId = null
      localStorage.removeItem('userId')
    },
  },
})
