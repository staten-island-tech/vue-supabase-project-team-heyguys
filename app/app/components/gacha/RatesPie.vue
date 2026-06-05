<template>
  <div class="h-full mx-auto flex items-center justify-center lg:flex-row flex-col p-[2%]">
    <canvas ref="chartCanvas" class='lg:max-h-full aspect-square max-h-[90%]'></canvas>
  </div>
</template>

<script setup lang="ts">
import { useGachaStore } from "#imports"
import { Chart, PieController, ArcElement, Tooltip, Legend, type ChartConfiguration } from "chart.js"
import { ref, onMounted } from "vue"

Chart.register( PieController, ArcElement, Tooltip, Legend)

const chartCanvas = ref<HTMLCanvasElement | null>(null)

const gachaStore = useGachaStore()

if (!gachaStore.initialized) {
  await gachaStore.initialize()
}

const gachaProbabilities = gachaStore.probabilityTable

onMounted(() => {
  if (!chartCanvas.value) return

  const labels: string[] = []
  const percentages: number[] = []
  const colors: string[] = []

  gachaProbabilities.forEach((rarity) => {
    const rarityChance =
      (rarity.max - rarity.min + 1) / 100

    const itemChance =
      rarityChance / rarity.pieces.length

    rarity.pieces.forEach((piece) => {
      labels.push(`${piece.name}'s ${piece.body_part} (${rarity.rarityName})`)
      percentages.push(Number((itemChance * 100).toFixed(3)))

      switch (rarity.rarityName) {
        case "Legendary":
          colors.push("#FFD700")
          break
        case "Epic":
          colors.push("#9C27B0")
          break
        case "Rare":
          colors.push("#2196F3")
          break
        default:
          colors.push("#9E9E9E")
      }
    })
  })

  const config: ChartConfiguration<"pie"> = {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: colors
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.label}: ${context.parsed}%`
            }
          }
        }
      }
    }
  }

  new Chart(chartCanvas.value, config)
})
</script>