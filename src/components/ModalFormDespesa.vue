<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Adicionar nova despesa</div>
      </q-card-section>

      <q-form @submit.prevent="handleSave" class="q-pa-md">
        <q-input
          v-model="form.despesa"
          label="Despesa"
          outlined
          :rules="[val => !!val || 'Campo obrigatório']"
        />

        <q-input
          v-model.number="form.valor"
          label="Valor"
          type="number"
          prefix="R$"
          outlined
          :rules="[val => val > 0 || 'Digite um valor válido']"
          class="q-mt-md"
        />

        <q-input
          v-model="form.categoria"
          label="Categoria"
          outlined
          :rules="[val => !!val || 'Campo obrigatório']"
          class="q-mt-md"
        />

        <q-input
          v-model="form.vencimento"
          label="Vencimento"
          type="date"
          outlined
          :rules="[val => !!val || 'Campo obrigatório']"
          class="q-mt-md"
        />

        <div class="q-gutter-sm q-mt-md flex justify-end">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn label="Salvar" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'add-despesa']);

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  isOpen.value = val;
});

watch(isOpen, (val) => {
  emit('update:modelValue', val);
});

const form = ref({
  despesa: '',
  valor: '',
  categoria: '',
  vencimento: ''
});

function handleSave() {
  // validação manual extra (caso queira garantir)
  if (!form.value.despesa || !form.value.valor) return;

  emit('add-despesa', { ...form.value });
  form.value = { despesa: '', valor: '', categoria: '', vencimento: '' };
  isOpen.value = false;
}
</script>
