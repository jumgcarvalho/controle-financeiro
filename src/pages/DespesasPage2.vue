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
    <div>
      <q-list>
        <q-separetor spaced />
        <q-item-label header>

          <h1 class="titulo-despesa">Despesas Fixas</h1>

          <div class="colunas">
            <h2>Despesa</h2>
            <h2>Valor</h2>
            <h2>Categoria</h2>
            <h2>Vencimento</h2>
          </div>

        </q-item-label>


         
      </q-list>
    </div>
  </q-page>
</template>

<script setup>

</script>

<style scoped lang="scss">

.colunas {
  display: flex;
}

.titulo-despesa {
  font-size: 50px;
}

.colunas h2 {
  font-size: 20px;
  padding-right: 300px;
}

</style>