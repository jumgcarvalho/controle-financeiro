<template>
  <q-card style="min-width: 700px">
    <q-card-section>
      <div class="text-h6">Adicionar nova despesa</div>
    </q-card-section>

    <q-form class="q-pa-md" @submit="enviarDespesas">
      <q-input
        v-model="form.description"
        label="Descrição"
        outlined
        :rules="[(val) => !!val || 'Campo obrigatório']"
        dense
      />

      <div class="row q-col-gutter-md">
        <div class="col-4">
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
          <q-select outlined v-model="form.expenseType" label="Tipo" :options="options" dense />
        </div>

        <div class="col-4">
          <q-input
            v-model="form.category"
            label="Categoria"
            outlined
            :rules="[(val) => !!val || 'Campo obrigatório']"
            dense
          />
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
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  description: '',
  amount: '',
  expenseType: '',
  category: '',
  dueDate: '',
})

const options = ['FIXED', 'VARIABLE']

const emit = defineEmits(['addDespesa'])

function enviarDespesas() {
  const payload = {
    description: form.value.description,
    amount: Number(form.value.amount),
    expenseType: form.value.expenseType,
    category: form.value.category,
    dueDate: new Date(form.value.dueDate).toISOString(),
  }
  emit('addDespesa', payload)
}
</script>

<style scoped></style>
