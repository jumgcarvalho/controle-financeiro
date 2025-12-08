<template>
  <q-page padding>
    <div class="row items-center justify-between">
        <q-card class="my-card bg-primary text-white text-center q-ml-md">
          <q-card-section>
            <div class="text-h6">Total das despesas: {{ formatCurrency(totalDespesas) }}</div>
          </q-card-section>
        </q-card>
      <div class="flex q-mr-md">
        <q-btn
          class="q-py-md"
          icon="ti-plus"
          label="Nova Despesa"
          :key="`btn_size_rd_md`"
          rounded
          color="primary"
          @click="abrirModal"
        >
        </q-btn>
      </div>
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
      >

        <template v-slot:body-cell-valor="props">
          <q-td :props="props">
            <div>{{ formatCurrency(props.row.amount) }}</div>
          </q-td>
        </template>

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

        <template v-slot:body-cell-acoes="props">
            <q-td :props="props">
              <template v-for="botoes in acoesDespesas" :key="botoes.label">
                <q-btn 
                :icon="botoes.icone" 
                dense 
                flat 
                :color="botoes.color"
                @click="botoes.action(props.row)"
                />
              </template>
            </q-td>
          </template>
        </q-table>
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

        <template v-slot:body-cell-valor="props">
          <q-td :props="props">
            <div>{{ formatCurrency(props.row.amount) }}</div>
          </q-td>
        </template>

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

        <template v-slot:body-cell-acoes="props">
            <q-td :props="props">
              <template v-for="botoes in acoesDespesas" :key="botoes.label">
                <q-btn 
                :icon="botoes.icone" 
                dense 
                flat 
                :color="botoes.color"
                @click="botoes.action(props.row)"
                />
              </template>
            </q-td>
          </template>
        
      </q-table>
    </div>

    <q-dialog v-model="modalAberto" persistent>
      <ModalFormDespesa @addDespesa="cadastrarDespesaTeste" />
    </q-dialog>

    <q-dialog v-model="deleteDialogAberto" persistent>
      <ConfirmDeleteDialog :infoDespesa="infoDespesa" @delete="apagarDespesa"/>
    </q-dialog>

    <q-dialog v-model="editDialogAberto">
      <ModalEditarDespesa :despesa="infoDespesa" @edit="editarDespesa2"/>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ModalFormDespesa from 'src/components/ModalFormDespesa.vue'
import { useDespesasStore } from '../stores/despesas-store'
import ConfirmDeleteDialog from '../components/ConfirmDeleteDialog.vue'
import ModalEditarDespesa from '../components/ModalEditarDespesa.vue'

const modalAberto = ref(false)
const despesasFixas = ref([])
const despesasVariaveis = ref([])
const deleteDialogAberto = ref(false)
const editDialogAberto = ref(false)
const totalDespesas = ref()

const { getDespesas, cadastrarDespesa, deletarDespesa, editarDespesa } = useDespesasStore()

const abrirModal = () => (modalAberto.value = true)

onMounted(async () => {
  try {
    await buscarDespesas()
    totalDespesas.value = await getTotalDespesas()
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
    style: 'width: 400px',
  },
  {
    name: 'valor',
    label: 'Valor',
    field: 'amount',
    align: 'left',
    style: 'width: 250px',
  },
  {
    name: 'categoria',
    label: 'Categoria',
    field: 'category',
    align: 'left',
    style: 'width: 250px',
  },
  {
    name: 'vencimento',
    label: 'Vencimento',
    field: (row) => formateDate(row.dueDate),
    align: 'left',
    style: 'width: 250px',
  },
  {
    name: 'acoes',
    label: 'Ações',
    field: 'acoes',
    align: 'left',
  }
])

const acoesDespesas = [
  {
    label: 'editar',
    icone: 'edit',
    color: 'orange-10',
    action: async (row) => {
      console.log("editando despesa")
      await editarDespesa1(row)
    },
  },
  {
    label: 'excluir',
    icone: 'delete',
    color: 'red-10',
    action: async (row) => {
      await excluirDespesa(row)
    },

  }
]

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
    totalDespesas.value = await getTotalDespesas()
  }
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})

function formatCurrency(value) {
  if (value == null || value === '') return ''

  // se for número
  if (typeof value === 'number') {
    return currencyFormatter.format(value)
  }

  let s = String(value).trim()

  if (s.includes(',')) {
    s = s.replace(/\./g, '').replace(',', '.')
  }

  const n = Number(s)

  if (isNaN(n)) return value

  return currencyFormatter.format(n)
}

const infoDespesa = ref(null)

async function excluirDespesa(despesa){
  infoDespesa.value = despesa
  deleteDialogAberto.value = true
}

async function editarDespesa1(despesa) {
  infoDespesa.value = despesa
  editDialogAberto.value = true
}

async function apagarDespesa(despesa) {
  await deletarDespesa(despesa.id)
  await buscarDespesas()
  totalDespesas.value = await getTotalDespesas()
  deleteDialogAberto.value = false
  infoDespesa.value = null
}

async function editarDespesa2(despesa) {
  await editarDespesa(despesa)
  await buscarDespesas()
  totalDespesas.value = await getTotalDespesas()
  editDialogAberto.value = false
}

async function getTotalDespesas() {
  let total= 0
  for(const despesa of despesasFixas.value) {
    total += Number(despesa.amount)
  }
  console.log(total)
  for(const despesa of despesasVariaveis.value) {
    total += Number(despesa.amount)
  }

  return total
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
  background-color:$secondary;
}

/* garante que não exista regra global atrapalhando */
.my-sticky-header-table ::v-deep(thead) {
  display: table-header-group;
}

.my-sticky-header-table ::v-deep(.q-table__top) {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: $secondary;
}
</style>
