<template>
    <q-page padding>
        <div class="flex justify-end">
            <q-card class="my-card bg-primary text-white q-mb-md flex text-center q-mr-md">
                <q-card-section class="flex flex-start full-height">
                    <div class="text-h6">Total das despesas: R$ 200,00</div>
                </q-card-section>
            </q-card>
        </div>
        
        <div class="q-pa-md">
            <q-table 
                class="my-sticky-header-table"
                title="Despesas Fixas" 
                :rows="rows1"
                :columns="columns1"
                row-key="id"
                style="height: 300px"
                :rows-per-page-options="[0]"
                hide-pagination
            />
        </div>

        <div class="q-pa-md">
            <q-table 
                title="Despesas Variáveis" 
                :rows="rows1"
                :columns="columns1"
                row-key="id"
                style="height: 300px"
                :rows-per-page-options="[0]"
                hide-pagination
            />
        </div>

        <div class="flex justify-end q-mr-md q-mt-md">
            <q-btn
                class="q-py-md"
                :key="`btn_size_rd_md`"
                rounded
                color="primary"
                label="Adicionar nova despesa"
            />
        </div>

    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const columns1 = ref([
    {
        name: 'despesa',
        label: 'Despesa',
        field: 'despesa',
        align: 'left',
    },
    {
        name: 'valor',
        label: 'Valor',
        field: 'valor',
        align: 'left',
    },
    {
        name: 'categoria',
        label: 'Categoria',
        field: 'categoria',
        align: 'left',
    },
    {
        name: 'vencimento',
        label: 'Vencimento',
        field: 'vencimento',
        align: 'left',
    },
])

const rows1 = ref([
    {
        id: 1,
        despesa: 'Aluguel',
        valor: 200,
        categoria: 'Moradia',
        vencimento: '26/10/2025'
    },
    {
        id: 2,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 3,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 4,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 5,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 6,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 6,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 6,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
    {
        id: 6,
        despesa: 'Energia',
        valor: 200,
        categoria: 'Moradia'
    },
])

</script>

<style lang="scss">

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
    background-color: #C6C5B9;
}

thead tr th {
    position: sticky;
    z-index: 1;
}

thead tr:first-child th {
    top: 0;
}

</style>