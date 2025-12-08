<template>
  <q-card class="q-pa-md" style="min-width: 500px">
    
    <div class="row items-center justify-center q-gutter-sm">
      <q-icon name="warning" color="red-8" size="40px"></q-icon>
      <div class="text-h6">Confirmar exclusão</div>
    </div>
    
    <q-card-section>
      <div class="text-h6">Deseja excluir essa despesa?</div>
      <!-- <pre>{{ props.infoDespesa }}</pre> -->
    </q-card-section>

    <div class="despesa-info">
      <div>{{ `Despesa: ${props.infoDespesa.description}` }}</div>
      <div>{{ `Valor: ${formatCurrency(props.infoDespesa.amount)}` }}</div>
      <div>{{ `Categoria: ${props.infoDespesa.category.name}` }}</div>
      <div>{{ `Vencimento: ${formateDate(props.infoDespesa.dueDate)}` }}</div>
    </div>

    <div class="q-gutter-sm q-mt-md flex justify-end">
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
      <q-btn label="Excluir" color="primary" @click="emit('delete', props.infoDespesa)" />
    </div>

  </q-card>
</template>

<script setup>

const props = defineProps({
  infoDespesa: {
    type: Object
  }
})

const emit = defineEmits(['delete'])

function formateDate(dataDespesa) {
  if (!dataDespesa) return ''
  const data = new Date(dataDespesa)
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
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
</script>

<style scoped>

.despesa-info {
  padding-left: 50px;
}

</style>