<template>
  <q-card style="min-width: 700px">
    <q-card-section>
      <div class="text-h6">Editar despesa</div>
    </q-card-section>

    <q-form class="q-pa-md" @submit="enviarDespesaEditada">
      <q-input
        v-model="form.description"
        label="Descrição"
        outlined
        :rules="[(val) => !!val || 'Campo obrigatório']"
        dense
      />

      <div class="row q-col-gutter-md">
        <div class="col-3">
          <q-input
            v-model.number="form.amount"
            label="Valor"
            type="number"
            prefix="R$"
            outlined
            :rules="[(val) => val > 0 || 'Digite um valor válido']"
            dense
          />
        </div>

        <div class="col-4">
          <q-select outlined v-model="form.expenseType" label="Tipo" dense :options="options" />
        </div>

        <div class="flex col-5">
          <q-select
            v-model="form.categoryId"
            label="Categoria"
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
            dense
            class="input-category"
            :options="categoriasBack"
            option-label="name"
            option-value="id"
            map-options
            emit-value 
          />
          <button 
          class="addCategory"
          @click="abrirModal"
          >+</button>
        </div>
        
      </div>

      <q-input
        v-model="form.dueDate"
        label="Vencimento"
        type="date"
        outlined
        :rules="[(val) => !!val || 'Campo obrigatório']"
        class="q-mt-sm"
        dense
      />

      <div class="q-gutter-sm q-mt-md flex justify-end">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn label="Salvar" color="primary" type="submit" />
      </div>
    </q-form>

    <q-dialog v-model="modalAberto" persistent>
      <ModalFormCategoria @addCategoria="cadastrarCategoria2"/>
    </q-dialog>

  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCategoriasStore } from '../stores/categorias-store'
import ModalFormCategoria from './categoria/ModalFormCategoria.vue'

const modalAberto = ref(false)
const abrirModal = () => (modalAberto.value = true)

const emit = defineEmits(['edit'])

const categoriasBack = ref([])

const { getCategorias, cadastrarCategoria } = useCategoriasStore()

onMounted(async () => {
  try {
    await buscarCategorias()
  } catch (error) {
    console.error(error)
  }
})

async function buscarCategorias() {
  categoriasBack.value = await getCategorias()
}

const props = defineProps({
  despesa: {
    type: Object
  }
})

const form = ref({
  id: '',
  description: '',
  amount: '',
  expenseType: '',
  categoryId: '',
  dueDate: '',
})

watch(() => props.despesa, (despesa) => {
  console.log(despesa)
  if (despesa) {
    form.value = {
    id: despesa.id,  
    description: despesa.description,
    amount: despesa.amount,
    expenseType: despesa.expenseType,
    categoryId: despesa.category.id,
    dueDate: formateDate(despesa.dueDate)
    }
  }
},
{ immediate: true }
)

const options = ['FIXED', 'VARIABLE']

function formateDate(dataDespesa) {
  if (!dataDespesa) return ''
  const data = new Date(dataDespesa)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${ano}-${mes}-${dia}`
}

function enviarDespesaEditada() {
console.log('Form antes de enviar:', form.value)

  const payload = {
    id: form.value.id,
    description: form.value.description,
    amount: Number(form.value.amount),
    expenseType: form.value.expenseType,
    categoryId: form.value.categoryId,
    dueDate: new Date(form.value.dueDate).toISOString(),
  }
  emit('edit', payload)
}

async function cadastrarCategoria2(categoria) {
  try {
    await cadastrarCategoria(categoria)
  } catch (error) {
    console.log(error)
  } finally {
    modalAberto.value = false
    //await buscarCategorias()
  }
}

</script>

<style scoped lang="scss">

.addCategory {
  width: 40px;
  height: 40px;
  background-color: $primary;
  color: white;
  margin-left: 5px;
  border-radius: 4px;
  padding-right: 2px;
  margin-left: 15px;
  border: none;
  cursor: pointer;
}

.input-category {
  width: 214px;
}

</style>
