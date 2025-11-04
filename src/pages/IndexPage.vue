<script setup>
import { useCounterStore } from 'src/stores/counter-store'

const counter = useCounterStore()
</script>

<template>
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
</template>
