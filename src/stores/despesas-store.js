import { api } from '../boot/axios'
import { defineStore } from 'pinia'
import { useQuasar } from 'quasar'

export const useDespesasStore = defineStore('despesas', () => {
  const $q = useQuasar()

  async function getDespesas() {
    $q.loading.show({
      message: 'Carregando despesas...',
    })
    try {
      const { data } = await api.get('/expenses')
      $q.loading.hide()
      return data
    } catch (error) {
      console.log('Erro ao buscar despesas:', error)
      $q.notify({ 
        type: 'negative',
        message: 'Erro ao buscar despesas. Tente novamente mais tarde.',
      })
    }
  }

  async function cadastrarDespesa(despesa) {
    const payload = {
      ...despesa,
      expenseStatus: 'PENDING'
    }

    try {
      console.log("Dados sendo enviados:", payload);
      await api.post(`/expenses`, payload)
    } catch (error) {
      console.log('Error ao cadastrar despesa', error)
    }
  }

  return { getDespesas, cadastrarDespesa }
})

// export const useDespesasStore = defineStore('despesas', {
// state: () => ({
//   despesasFixas: [],
//   despesasVariaveis: [],
//   loading: false,
//   err: null,
// }),
// actions: {
//   async getDespesas() {
//     this.loading = true
//     try {
//       const { data } = await api.get('/expenses')
//       console.log(data)
//       this.despesasFixas = data.despesasFixas
//       this.despesasVariaveis = data.despesasVariaveis
//       return data
//     } catch (error) {
//       this.err = error
//     } finally {
//       this.loading = false
//     }
//   },
//   // async getUmaDespesa() {
//   //   try {
//   //     return this.despesas.filter((despesa) => {
//   //       // if(despesa.id == data?.id) {
//   //       //   return despesa
//   //       // }
//   //     })
//   //   } catch (error) {
//   //     this.err = error
//   //   } finally {
//   //     this.loading = false
//   //   }
//   // },
// },
// })
