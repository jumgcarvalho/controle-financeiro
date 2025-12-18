import { api } from "../boot/axios";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useCategoriasStore = defineStore('categorias', () => {
  const $q = useQuasar()

  async function getCategorias(id) {
    $q.loading.show({
      message: 'Carregando categorias...'
    })
    try {
      const { data } = await api.get(`/category/${id}/all`)
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

  async function cadastrarCategoria(categoria, userId) {
    const payload = {
      ...categoria,
      userId: userId
    }

    try {
      console.log("Dados sendo enviados:", payload);
      await api.post(`/category`, payload)
    } catch (error) {
      console.log('Error ao cadastrar categoria', error)
    }
  }

  return { getCategorias, cadastrarCategoria }
})