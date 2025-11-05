<template>
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Adicionar nova categoria</div>
    </q-card-section>

    <q-form class="q-pa-md">
      <div class="col">
        <q-input
        outlined
        label="Nome"
        class="q-mb-md" 
        />

        <q-input
        outlined
        label="Cor"
        v-model="color"
        >
          <template v-slot:append>
            <div class="espacamento flex">
              <div
              class="color-preview"
              :style="{ backgroundColor: form.color || '#ccc'}"
              ></div>

              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="form.color" no-header no-footer />
                </q-popup-proxy>
              </q-icon>
            </div>
          </template>
        </q-input>
      </div>
    </q-form>

  </q-card>
</template>

<script setup>
import { ref } from 'vue'

  const form = ref({
    name: '',
    color: '',
    icon: '',
  })
  const color = ref('')
</script>

<style scoped>

.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

/* q-card {
  background-color: blue;
} */

</style>