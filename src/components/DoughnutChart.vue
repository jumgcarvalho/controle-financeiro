<template>
  <div class="chart-box">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js/auto';

const canvas = ref(null);

onMounted(() => {
  new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
      datasets: [
        {
          label: ["Jan", "Fev", "Mar", "Abr", "Mai"],
          data: [10, 20, 30, 55, 15],
          backgroundColor: ['#E53935', '#1E88E5', '#FDD835', '#7C3DB8', '#35BD45']
        },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // ← ESSENCIAL
    }
  })
})

</script>

<style scoped>

.chart-box {
  width: 400px;     /* largura fixa */
  height: 400px;    /* altura fixa */
  position: relative; /* IMPORTANTE para Chart.js */
}

</style>