import { api } from "../boot/axios";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useCategoriasStore = defineStore('categorias', () => {
  const $q = useQuasar()

  async function getCategorias() {
    $q.loading.show({
      message: 'Carregando categorias...'
    })
    try {
      const { data } = await api.get('/category')
      $q.loading.hide()
      return data
    } catch (error) {
      console.log('Erro ao buscar categorias:', error)
      $q.notify({
        type: 'negative',
        message: 'Erro ao buscar categorias. Tente novamente mais tarde.'
      })
    }
  }

  async function cadastrarCategoria(categoria) {
    try {
      console.log("Dados sendo enviados:", categoria);
      await api.post(`/category`, categoria)
    } catch (error) {
      console.log('Error ao cadastrar categoria', error)
    }
  }

  return { getCategorias, cadastrarCategoria }
})