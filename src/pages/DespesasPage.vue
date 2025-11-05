<template>
  <q-page padding>
    <div class="flex justify-end q-mr-md q-mt-md">
      <q-btn
        class="q-py-md"
        :key="`btn_size_rd_md`"
        rounded
        color="primary"
        label="Adicionar nova despesa"
        @click="abrirModal"
      />
    </div>
    <!-- @click="abrirModal" chama uma função abrirModal ao ser clicado -->
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Despesas Fixas"
        :rows="despesasFixas"
        :columns="columns1"
        row-key="id"
        style="height: 300px"
        :rows-per-page-options="[0]"
        hide-pagination
      />
      <!-- <pre>{{ despesasVariaveis }}</pre>  -->
    </div>

    <div class="q-pa-md">
      <q-table
        title="Despesas Variáveis"
        :rows="despesasVariaveis"
        :columns="columns1"
        row-key="id"
        style="height: 300px"
        :rows-per-page-options="[0]"
        hide-pagination
      />
    </div>

    <div class="flex justify-end">
      <q-card class="my-card bg-primary text-white q-mb-md flex text-center q-mr-md">
        <q-card-section class="flex flex-start full-height">
          <div class="text-h6">Total das despesas: R$ 200,00</div>
        </q-card-section>
      </q-card>
    </div>

    <q-page class="flex flex-center">
      <div class="q-pa-md column items-center">
        <h2>Counter Test</h2>

        <p class="text-h5 q-my-md">Count: {{ counter.count }}</p>
        <p>Double: {{ counter.doubleCount }}</p>

        <div class="row q-gutter-sm">
          <q-btn label="-" color="negative" @click="counter.decrement" />
          <q-btn label="+" color="primary" @click="counter.increment" />
          <q-btn label="Reset" color="grey" @click="counter.reset" />
        </div>
      </div>
    </q-page>

    <!-- modal 
        <ModalFormDespesa
            v-model="modalAberto"
            @add-despesa="adicionarDespesa"
        />
        -->
    <q-dialog v-model="modalAberto" persistent>
      <ModalFormDespesa @addDespesa="cadastrarDespesaTeste" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ModalFormDespesa from 'src/components/ModalFormDespesa.vue'
import { useCounterStore } from '../stores/counter-store'
import { useDespesasStore } from '../stores/despesas-store'

const counter = useCounterStore()
const modalAberto = ref(false)
const despesasFixas = ref([])
const despesasVariaveis = ref([])

const { getDespesas, cadastrarDespesa } = useDespesasStore()

const abrirModal = () => (modalAberto.value = true)

onMounted(async () => {
  try {
    await buscarDespesas()
  } catch (error) {
    console.error(error)
  }
})

async function buscarDespesas() {
  const resposta = await getDespesas()
  despesasFixas.value = resposta.despesasFixas
  despesasVariaveis.value = resposta.despesasVariaveis
}

const columns1 = ref([
  {
    name: 'despesa',
    label: 'Despesa',
    field: 'description',
    align: 'left',
  },
  {
    name: 'valor',
    label: 'Valor',
    field: 'amount',
    align: 'left',
  },
  {
    name: 'categoria',
    label: 'Categoria',
    field: 'category',
    align: 'left',
  },
  {
    name: 'vencimento',
    label: 'Vencimento',
    field: (row) => formateDate(row.dueDate),
    align: 'left',
  },
])

function formateDate(dataDespesa) {
  if (!dataDespesa) return ''
  const data = new Date(dataDespesa)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

async function cadastrarDespesaTeste(despesa) {
  try {
    await cadastrarDespesa(despesa)
  } catch (error) {
    console.log(error)
  } finally {
    modalAberto.value = false
    await buscarDespesas()
  }
    
}
</script>

<style scoped lang="scss">
.my-card {
  width: max-content;
  height: 60px;
}

.q-table {
  max-height: 100px;
}

.my-sticky-header-table {
  height: 310px;
}

.q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #c6c5b9;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}
</style>
