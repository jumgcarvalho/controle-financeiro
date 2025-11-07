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
        v-model="form.color"
        class="q-mb-md"
        >

          <template v-slot:prepend>
            <div
              class="color-preview"
              :style="{ backgroundColor: form.color || '#ccc' }"
            ></div>
          </template>

          <template v-slot:append>
            <div class="espacamento flex">
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-color v-model="form.color" no-header no-footer />
                </q-popup-proxy>
              </q-icon>
            </div>
          </template>
        </q-input>

        <q-select
        outlined
        label="Ícone"
        v-model="form.icon"
        :options="availableIcons"
        option-value="value"
        option-label="label"
        emit-value
        map-options
        >

        <template v-slot:prepend>
          <q-icon v-if="form.icon" :name="`ti-${form.icon.toLowerCase()}`" tag="i"></q-icon>
        </template>

        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <q-icon :name="`ti-${scope.opt.value}`" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>


        </q-select>

        <div class="q-gutter-sm q-mt-md flex justify-end">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn label="Salvar" color="primary" type="submit" />
        </div>

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

  const availableIcons = [
  { label: 'Wallet', value: 'wallet' },
  { label: 'Support', value: 'support' },
  { label: 'Shopping Cart Full', value: 'shopping-cart-full' },
  { label: 'Car', value: 'car' },
  { label: 'Home', value: 'home' },
  { label: 'Heart', value: 'heart' },
  { label: 'Gift', value: 'gift' },
  { label: 'Game', value: 'game' },
  { label: 'Wand', value: 'wand' },
  { label: 'Face Smile', value: 'face-smile' },
  { label: 'Book', value: 'book' },
  { label: 'Tag', value: 'tag'}
  ]

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