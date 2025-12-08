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
      $q.notify({
        type: 'positive',
        message: 'Despesa cadastrada com sucesso!'
      })
    } catch (error) {
      console.log('Error ao cadastrar despesa', error)
    }
  }

  async function editarDespesa(despesa) {
    try {
      await api.patch(`/expenses/${despesa.id}`, despesa)
      $q.notify({
        type: 'positive',
        message: 'Despesa editada com sucesso!'
      })
    } catch (error) {
      console.log('Error ao editar despesa', error)
    }
  }

  async function deletarDespesa(id) {
    console.log(id)
    try {
      await api.delete(`/expenses/${id}`)
      $q.notify({
        type: 'positive',
        message: 'Despesa excluída com sucesso!'
      })
    } catch (error) {
      console.log('Error ao excluir despesa', error)
    }
  }

  return { getDespesas, cadastrarDespesa, deletarDespesa, editarDespesa }
})


