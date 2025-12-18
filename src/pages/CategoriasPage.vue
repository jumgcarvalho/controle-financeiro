<template>
  <q-page padding>
    <div class="flex justify-end q-mr-md q-mt-md">
      <q-btn
        class="q-py-md"
        :key="`btn_size_rd_md`"
        rounded
        color="primary"
        icon="ti-plus"
        label="Nova Categoria"
        @click="abrirModal"
      />
    </div>

    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        title="Categorias"
        :columns="columns"
        :rows="categorias"
        row-key="id"
        :rows-per-page-options="[0]"
        hide-pagination
      >
      <template v-slot:body-cell-icone="props">
          <q-td :props="props">
            <div v-if="props.row.icon">
              <q-icon
                :name="'ti-' + props.row.icon"
              ></q-icon>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-cor="props">
          <q-td :props="props">
            <div v-if="props.row.color">
              <div 
                class="circulo-cor"
                :style="`background-color:${props.row.color}`"
              ></div>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="modalAberto" persistent>
      <ModalFormCategoria @addCategoria="cadastrarCategoria2"/>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCategoriasStore } from '../stores/categorias-store';
import ModalFormCategoria from '../components/categoria/ModalFormCategoria.vue';
import { useAuthStore } from '../stores/auth';

const categorias = ref([])

const { getCategorias, cadastrarCategoria } = useCategoriasStore()
const { userId } = useAuthStore()

onMounted(async () => {
  try {
    await buscarCategorias(userId)
  } catch (error) {
    console.error(error)
  }
})

async function buscarCategorias(userId) {
  categorias.value = await getCategorias(userId)
}

const modalAberto = ref(false)

const abrirModal = () => (modalAberto.value = true)

const columns = ref([
  {
    name: 'categoria',
    label: 'Categoria',
    field: 'name',
    align: 'left'
  },
  {
    name: 'cor',
    label: 'Cor',
    field: 'color',
    align: 'left'
  },
  {
    name: 'icone',
    label: 'Ícone',
    field: 'icon',
    align: 'left'
  }
])

async function cadastrarCategoria2(categoria) {
  try {
    await cadastrarCategoria(categoria, userId)
  } catch (error) {
    console.log(error)
  } finally {
    modalAberto.value = false
    await buscarCategorias()
  }
}

</script>

<style scoped lang="scss">

.circulo-cor {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  display: inline-block;
}
.my-sticky-header-table ::v-deep(.q-table__middle),
.my-sticky-header-table ::v-deep(.q-table__container) {
  max-height: 310px; /* altura da tabela com scroll */
  overflow-y: auto; /* scroll interno */
}

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