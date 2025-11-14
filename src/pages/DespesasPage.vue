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
        :rows-per-page-options="[0]"
        hide-pagination
      />
      <!-- <pre>{{ despesasVariaveis }}</pre> -->
    </div>

    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Despesas Variáveis"
        :rows="despesasVariaveis"
        :columns="columns1"
        row-key="id"
        :rows-per-page-options="[0]"
        hide-pagination
      >
        <template v-slot:body-cell-categoria="props">
          <q-td :props="props">
            <div v-if="props.row.category">
              <q-icon
                :style="`color:${props.row.category?.color}`"
                :name="'ti-' + props.row.category?.icon"
              ></q-icon>
              <span class="q-ml-sm">{{ props.row.category?.name }}</span>
            </div>
            <div></div>
          </q-td>
        </template>
      </q-table>
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
    style: 'width: 500px',
  },
  {
    name: 'valor',
    label: 'Valor',
    field: 'amount',
    align: 'left',
    style: 'width: 300px',
  },
  {
    name: 'categoria',
    label: 'Categoria',
    field: 'category',
    align: 'left',
    style: 'width: 300px',
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

/* aplica o scroll ao contêiner interno da q-table */
.my-sticky-header-table ::v-deep(.q-table__middle),
.my-sticky-header-table ::v-deep(.q-table__container) {
  max-height: 310px; /* altura da tabela com scroll */
  overflow-y: auto; /* scroll interno */
}

/* fixa o thead dentro do contêiner rolável */
.my-sticky-header-table ::v-deep(thead th) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #c6c5b9;
}

/* garante que não exista regra global atrapalhando */
.my-sticky-header-table ::v-deep(thead) {
  display: table-header-group;
}

.my-sticky-header-table ::v-deep(.q-table__top) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #c6c5b9;
}
</style>
